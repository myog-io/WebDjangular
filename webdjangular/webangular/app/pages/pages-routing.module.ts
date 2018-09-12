import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
	{
		path: '',
		component: PagesComponent,
		children: [
			{
				path: '',
				component: DashboardComponent,
			},
			{
				path: 'user',
				loadChildren: './user/user.module#UserModule',
			},
			{
				path: 'group',
				loadChildren: './group/group.module#GroupModule' ,
			},
	  	],
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
