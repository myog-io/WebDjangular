import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebAngularDataStore } from './WebAngularDataStore.service';
import { LayoutService } from './layout.service';
import { StateService } from './state.service';
import { AnalyticsService } from './analytics.service';
import { RoleProvider } from './role-provider.service';
import { PermissionGuard } from './permission-guard.service';
import { AuthGuard } from './auth-guard.service';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { WDAConfig } from './wda-config.service';
import { throwIfAlreadyLoaded } from '@webdjangular/core/shared';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken, NbPasswordAuthStrategyOptions } from '@nebular/auth';
import {ClientUserService} from "./client-user.service";


const SERVICES = [
  LayoutService,
  StateService,
  WebAngularDataStore,
  AnalyticsService,
  RoleProvider,
  PermissionGuard,
  AuthGuard,
  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
      },
    },
  }).providers,
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: '',
        login: {
          endpoint: 'api/token/',
          redirect: {
            success: '/',
            failure: null,
          },
        },
        register: {
          endpoint: 'api/auth/register',
        },
        token: {
          key: 'data.token',
          class: NbAuthJWTToken,
          getter: (module: string, res: any, options: NbPasswordAuthStrategyOptions) => {
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
  {
    provide: NbRoleProvider, useClass: RoleProvider,
  },
  ClientUserService,
  WDAConfig
];

@NgModule({
  imports: [
    CommonModule,
  ],

  providers: [
    ...SERVICES,
  ],
})
export class CoreServicesModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreServicesModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreServicesModule');
  }
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreServicesModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
