import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageModel } from '../@core/data/models/Page.model';

import { PermissionGuard } from '../@core/services/permission-guard.service';
import { ThemeModel } from '../@core/data/models/Theme.model';
import { PluginModel } from '../@core/data/models/Plugin.model';

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
