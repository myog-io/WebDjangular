import { ComponentFactory, Injectable, Injector, NgModuleFactoryLoader, Compiler, Component, NgModule, ModuleWithComponentFactories, SystemJsNgModuleLoader, NgModuleFactory, Type } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise as ObservableFromPromise } from 'rxjs/observable/fromPromise';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InjectionToken } from '@angular/core';
import { CoreDynamicLazyLoadConfig } from './core-dynamic-lazy-load.module';

export const DYNAMIC_COMPONENT = new InjectionToken<any>('DYNAMIC_COMPONENT');


@Injectable()
export class CoreDynamicComponentLoader {
  private runtimeModule;
  constructor(
    private loader: SystemJsNgModuleLoader,
    private injector: Injector,
    private compiler: Compiler,
  ) {

  }

  /** Retrieve a ComponentFactory, Based on the Module Path, we will load the Theme this Way. */
  getComponentFactory<T>(loadChildren: string, injector?: Injector): Observable<ComponentFactory<T>> {
    const p = this.loader.load(loadChildren)
      .then((ngModuleFactory: NgModuleFactory<any>) => {
        const moduleRef = ngModuleFactory.create(injector || this.injector);
        //In order for the Module/Component to Work the developer has to add CoreDynamicLazyLoadModule.forChild({component:nameOfTheComponet}) on the @module imports declaration
        const entryComponent = moduleRef.injector.get(CoreDynamicLazyLoadConfig).component;
        return moduleRef.componentFactoryResolver.resolveComponentFactory<T>(entryComponent);
      });

    return ObservableFromPromise(p);
  }

  createComponentFactorySync(metadata: Component, componentClass?: any, cmpiler?: Compiler): ComponentFactory<any> {
    const compiler = cmpiler || this.compiler;
    const cmpClass = componentClass || class RuntimeComponent { name = 'Dany' };
    const decoratedCmp = Component(metadata)(cmpClass);
    // TODO:: Imporvement, try to find a list on the HTML before Generating and Therefore Loading the components


    if (!this.runtimeModule) {
      const declarations = [];//PLUGIN_COMPONENTS
      declarations.push(decoratedCmp);

      this.runtimeModule = NgModule({
        imports: [
          CommonModule,
          RouterModule
        ], declarations: declarations
      })(class WDARuntimeModule { });

    }
    console.log(this.runtimeModule)

    const moduleFactory: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(this.runtimeModule);
    return moduleFactory.componentFactories.find((f) => {

      return f.componentType === decoratedCmp
    });
  }

}
