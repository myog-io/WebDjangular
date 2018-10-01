import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebAngularDataStore } from '@webdjangular/core/services';
import { LayoutService } from './layout.service';
import { StateService } from './state.service';


const SERVICES = [
  LayoutService,
  StateService,
  WebAngularDataStore,
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
