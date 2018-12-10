import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '@webdjangular/core/admin-theme';

import { UserComponent } from './user.component';
import { UserEditComponent } from './edit/user-edit.component';
import { UserRoutingModule } from './user-routing.module';
import { BuilderFormModule } from '@webdjangular/core/builder';



const COMPONENTS = [
	UserComponent,
	UserEditComponent
];

@NgModule({
  imports: [
  	ThemeModule,
    UserRoutingModule,
    Ng2SmartTableModule,
    BuilderFormModule
  ],
  declarations: [
    ...COMPONENTS,
  ],
})
export class UserModule {

}

