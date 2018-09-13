import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutService } from './layout.service';
import { StateService } from './state.service';

import { WebAngularDataStore } from './data-store/WebAngularDataStore.service';


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
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
