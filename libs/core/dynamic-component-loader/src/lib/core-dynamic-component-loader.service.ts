import { ComponentFactory, Injectable, Injector, NgModuleFactoryLoader, Compiler, Component, NgModule, ModuleWithComponentFactories, SystemJsNgModuleLoader, NgModuleFactory, Type, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise as ObservableFromPromise } from 'rxjs/observable/fromPromise';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InjectionToken } from '@angular/core';
import { CoreDynamicLazyLoadConfig } from './core-dynamic-lazy-load.module';

// TODO: HARDCODE

import { PluginProviderModule } from "@webdjangular/plugins/provider"
import { FormsModule } from "@webdjangular/core/forms";
import { CoreCmsModule } from '@webdjangular/core/cms';

const HARDCODEMODULES = [
  FormsModule,
  CoreCmsModule,
  PluginProviderModule,
];

//import { ThemeProviderfyModule } from "@webdjangular/themes/providerfy";


export const DYNAMIC_COMPONENT = new InjectionToken<any>('DYNAMIC_COMPONENT');
export class CoreDynamicCustomComponent implements OnInit, OnDestroy {
  name = "CoreDynamicCustomComponent"
  public instance: CoreDynamicCustomComponent;
  constructor() {
    this.instance = this;
  }
  ngOnInit() {

  }
  ngOnDestroy() {

  }
}

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
    const cmpClass = componentClass || class RuntimeComponent extends CoreDynamicCustomComponent { }
    const decoratedCmp = Component(metadata)(cmpClass);
    // TODO:: Imporvement, try to find a list on the HTML before Generating and Therefore Loading the components


    const declarations = [];//PLUGIN_COMPONENTS
    declarations.push(decoratedCmp);

    this.runtimeModule = NgModule({
      imports: [
        CommonModule,
        RouterModule,
        ...HARDCODEMODULES // Importing all the Modules weant the Components From
        //ThemeProviderfyModule,
      ], declarations: declarations
    })(class WDARuntimeModule { });


    const moduleFactory: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(this.runtimeModule);
    return moduleFactory.componentFactories.find((f) => {

      return f.componentType === decoratedCmp
    });
  }

}
