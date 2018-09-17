import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';

import { UserComponent } from './user.component';
import { UserEditComponent } from './edit/user-edit.component';
import { UserRoutingModule } from './user-routing.module';



const COMPONENTS = [
	UserComponent,
	UserEditComponent
];

@NgModule({
  imports: [
  	ThemeModule,
    UserRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})
export class UserModule {

}

