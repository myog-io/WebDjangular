import { ComponentFactory, Inject, Injectable, Injector, NgModuleFactoryLoader, Compiler, Component, NgModule, ModuleWithComponentFactories, NgModuleFactory } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise as ObservableFromPromise } from 'rxjs/observable/fromPromise';
import { _throw as ObservableThrow } from 'rxjs/observable/throw';

import { DYNAMIC_COMPONENT, DYNAMIC_COMPONENT_MANIFESTS, DynamicComponentManifest } from './dynamic-component-manifest';
import { CommonModule } from '@angular/common';
import { PLUGIN_COMPONENTS } from '../../../plugins/plugins.module';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Injectable()
export class DynamicComponentLoader {
    private runtimeModule;
    constructor(
        @Inject(DYNAMIC_COMPONENT_MANIFESTS) private manifests: DynamicComponentManifest[],
        private loader: NgModuleFactoryLoader,
        private injector: Injector,
        private compiler: Compiler,
    ) { 

    }

    /** Retrieve a ComponentFactory, based on the specified componentId (defined in the DynamicComponentManifest array). */
    getComponentFactory<T>(componentId: string, injector?: Injector): Observable<ComponentFactory<T>> {
        const manifest = this.manifests
            .find(m => m.componentId === componentId);
        if (!manifest) {
            return ObservableThrow(`DynamicComponentLoader: Unknown componentId "${componentId}"`);
        }

        const p = this.loader.load(manifest.loadChildren)
            .then(ngModuleFactory => {
                const moduleRef = ngModuleFactory.create(injector || this.injector);
                const dynamicComponentType = moduleRef.injector.get(DYNAMIC_COMPONENT);
                if (!dynamicComponentType) {
                    throw new Error(
                        `DynamicComponentLoader: Dynamic module for componentId "${componentId}" does not contain DYNAMIC_COMPONENT as a provider.`,
                    );
                }

                return moduleRef.componentFactoryResolver.resolveComponentFactory<T>(dynamicComponentType);
            });

        return ObservableFromPromise(p);
    }

    createComponentFactorySync(metadata: Component, componentClass?: any, cmpiler?: Compiler): ComponentFactory<any> {
        const compiler = cmpiler || this.compiler;
        const cmpClass = componentClass || class RuntimeComponent { name: string = 'test-tables' };
        const decoratedCmp = Component(metadata)(cmpClass);
        // TODO:: Imporvement, try to find a list on the HTML before Generating and Therefore Loading the components

        
        if(!this.runtimeModule) { 
            const declarations = PLUGIN_COMPONENTS
            declarations.push(decoratedCmp);
    
            this.runtimeModule = NgModule({ imports: [
                CommonModule,
                RouterModule
            ], declarations: declarations })(class {});
    
        }
        
        let module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(this.runtimeModule);
        return module.componentFactories.find((f) => { 
            return f.componentType === decoratedCmp
        });
    }

}
