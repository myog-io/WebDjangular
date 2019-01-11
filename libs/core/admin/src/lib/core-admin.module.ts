import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule } from '@nebular/auth';
import { throwIfAlreadyLoaded } from '@webdjangular/core/shared';
import { CoreServicesModule } from '@webdjangular/core/services';

export const NB_CORE_PROVIDERS = [
  ...CoreServicesModule.forRoot().providers,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreAdminModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreAdminModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreAdminModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreAdminModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
