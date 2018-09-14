import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';
import { UserEditComponent } from './edit/user-edit.component';

const routes: Routes = [
	{
		path: '',
		component: UserComponent,
	},
	{
		path: 'new',
		component: UserEditComponent,
	},
	{
		path: 'edit/:id',
		component: UserEditComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {
	
}
