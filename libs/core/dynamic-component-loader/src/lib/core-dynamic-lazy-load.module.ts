import { NgModule, ModuleWithProviders, Type } from '@angular/core';

export class CoreDynamicLazyLoadConfig {
  constructor(public component: Type<any>) {}
}

@NgModule({})
export class CoreDynamicLazyLoadModule {
  public static forChild(config: CoreDynamicLazyLoadConfig): ModuleWithProviders {
    return {
      ngModule: CoreDynamicLazyLoadModule,
      providers: [{provide: CoreDynamicLazyLoadConfig, useValue: config}]
    }
  }
}
