import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageModel } from '@webdjangular/core/cms-models';
import { FormModel } from '@webdjangular/core/forms-models'


import { PermissionGuard } from '@webdjangular/core/services';
import { ThemeModel, CoreWebsiteModel } from '@webdjangular/core/data-models';
import { PluginModel } from '@webdjangular/core/data-models';
import { ScaffoldModule } from './scaffold/scaffold.module';
import { GroupModule } from './group/group.module';
import { UserModule } from './user/user.module';
import { CoreMediaModule } from '@webdjangular/core/media';

import { CoreConfigGroupModule } from './core-config-group/core-config-group.module';
import { CityModel } from '@webdjangular/plugins/provider-data';

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
        loadChildren: () => UserModule,
      },
      {
        path: 'group',
        loadChildren: () => GroupModule,
      },
      {
        path: 'media',
        loadChildren: () => CoreMediaModule,
      },
      {
        path: 'pages',
        loadChildren: () => ScaffoldModule,
        data: {
          model: PageModel,
          title: "Page",
          path: 'pages'
        }
      },
      {
        path: 'forms',
        loadChildren: () => ScaffoldModule,
        data: {
          model: FormModel,
          title: "Form",
          path: 'forms'
        }
      },
      {
        path: 'core_themes',
        loadChildren: () => ScaffoldModule,
        data: {
          model: ThemeModel,
          title: "Theme",
          path: 'core_themes'
        }
      },
      {
        path: 'core_plugins',
        loadChildren: () => ScaffoldModule,
        data: {
          model: PluginModel,
          title: "Plugin",
          path: 'core_plugins'
        }
      },
      {
        path: 'core_websites',
        loadChildren: () => ScaffoldModule,
        data: {
          model: CoreWebsiteModel,
          title: 'Websites',
          path: 'core_websites'
        }
      },
      {
        path: 'cities',
        loadChildren: () => ScaffoldModule,
        data: {
          model: CityModel,
          title: 'Cities',
          path: 'cities'
        }
      },
      {
        path: 'core_config_group/:id',
        loadChildren: () => CoreConfigGroupModule
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
