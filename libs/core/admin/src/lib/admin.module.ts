import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';

const ADMIN_COMPONENTS = [
  AdminComponent,
];

@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule,
    DashboardModule,
    UserModule,
    GroupModule
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

