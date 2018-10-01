import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageModel } from '@webdjangular/core/cms-models';

import { PermissionGuard } from '@webdjangular/core/services';
import { ThemeModel } from '@webdjangular/core/data-models';
import { PluginModel } from '@webdjangular/core/data-models';

const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
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
				loadChildren: './group/group.module#GroupModule',
			},
			{
				path: 'pages',
				loadChildren: './scaffold/scaffold.module#ScaffoldModule',
				data: {
					model: PageModel,
					title:"Page",
					path: 'pages'
				}
			},
			{
				path: 'core_themes',
				loadChildren: './scaffold/scaffold.module#ScaffoldModule',
				data: {
					model: ThemeModel,
					title:"Theme",
					path: 'core_themes'
				}
			},
			{
				path: 'core_plugins',
				loadChildren: './scaffold/scaffold.module#ScaffoldModule',
				data: {
					model: PluginModel,
					title:"Plugin",
					path: 'core_plugins'
				}
			}
	  	],
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
