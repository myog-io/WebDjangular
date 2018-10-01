import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebAngularDataStore } from './WebAngularDataStore.service';
import { LayoutService } from './layout.service';
import { StateService } from './state.service';
import { AnalyticsService } from './analytics.service';
import { RoleProvider } from './role-provider.service';
import { PermissionGuard } from './permission-guard.service';


const SERVICES = [
  LayoutService,
  StateService,
  WebAngularDataStore,
  AnalyticsService,
  RoleProvider,
  PermissionGuard,
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
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreServicesModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
