import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbPasswordAuthStrategy, NbPasswordAuthStrategyOptions, NbAuthJWTToken } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

import { throwIfAlreadyLoaded } from '@webdjangular/core/shared';


import { CoreServicesModule, AnalyticsService, RoleProvider, WDAConfig, AuthGuard, PermissionGuard } from '@webdjangular/core/services';

export const NB_CORE_PROVIDERS = [
  AuthGuard,
  RoleProvider,
  PermissionGuard,
  ...CoreServicesModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: '',
        login: {
          endpoint: 'api/token/',
          redirect: {
            success: 'admin/',
            failure: null,
          },
        },
        register: {
          endpoint: 'api/auth/register',
        },
        token: {
          key: 'data.token',
          class: NbAuthJWTToken,
          getter: (module: string, res: HttpResponse<Object>, options: NbPasswordAuthStrategyOptions) => {
            if (typeof res.body['data'] !== 'undefined') {
              return res.body['data']['token'];
            }
          },
        }
      }),
    ],
    forms: {
    }
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: RoleProvider,
  },
  WDAConfig,
  AnalyticsService,
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
