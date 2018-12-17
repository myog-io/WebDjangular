import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { AdminExportImportComponent } from './export-import/export-import.component';

const ADMIN_COMPONENTS = [
  AdminComponent,
  AdminExportImportComponent
];

@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule,
    DashboardModule,
  ],
  declarations: [
    ...ADMIN_COMPONENTS,

  ],
  exports:[
    AdminRoutingModule,
  ],
  entryComponents:[
    ...ADMIN_COMPONENTS
  ]
})
export class AdminModule {

}

