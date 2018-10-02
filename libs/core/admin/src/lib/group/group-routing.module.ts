import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { GroupComponent } from './group.component';
import { GroupEditComponent } from './edit/group-edit.component';

const routes: Routes = [
	{
		path: '',
		component: GroupComponent,
	},
	{
		path: 'new',
		component: GroupEditComponent,
	},
	{
		path: 'edit/:id',
		component: GroupEditComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {
	
}
