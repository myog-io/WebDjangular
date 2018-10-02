import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  ModuleWithProviders,
  NgModule,
  NgModuleFactoryLoader,
  SystemJsNgModuleLoader,
  Type,
} from '@angular/core';
import { ROUTES } from '@angular/router';
import { CoreDynamicComponentLoader } from './core-dynamic-component-loader.service';


@NgModule()
export class CoreDynamicComponentLoaderModule {
  static forRoot(): ModuleWithProviders {
      return {
          ngModule: CoreDynamicComponentLoaderModule,
          providers: [
              CoreDynamicComponentLoader,
              SystemJsNgModuleLoader,
              //{ provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader },
              // provider for Angular CLI to analyze
              { provide: ROUTES, useValue: [], multi: true },
          ],
      };
  }
  static forChild(component: Type<any>): ModuleWithProviders {
      return {
          ngModule: CoreDynamicComponentLoaderModule,
          providers: [
              { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: component, multi: true },
              // provider for @angular/router to parse
              { provide: ROUTES, useValue: [], multi: true },
          ],
      };
  }
}
