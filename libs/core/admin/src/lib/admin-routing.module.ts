import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { AdminImportComponent } from './export-import/import/import.component';
import { AdminExportComponent } from './export-import/export/export.component';
import { GroupModel, UserModel } from '@core/users/src/lib/models';
import { CoreWebsiteModel, PluginModel, ThemeModel } from '@core/data/src/lib/models';
import { EmailModel } from '@core/data/src/lib/models/Email.model';


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
        loadChildren: '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: UserModel,
          title: "Users",
          path: 'user'
        }
      },
      {
        path: 'group',
        loadChildren: '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: GroupModel,
          title: "Groups",
          path: 'group'
        }
      },
      {
        path: 'media',
        loadChildren: '@core/media/src/lib/core-media.module#CoreMediaModule',
      },

      {
        path: 'core_themes',
        loadChildren: '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: ThemeModel,
          title: "Theme",
          path: 'core_themes'
        }
      },
      {
        path: 'core_email',
        loadChildren: '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: EmailModel,
          title: "Email Templates",
          path: 'core_email'
        }
      },
      {
        path: 'core_plugins',
        loadChildren: '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: PluginModel,
          title: "Plugin",
          path: 'core_plugins'
        }
      },
      {
        path: 'core_websites',
        loadChildren: '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: CoreWebsiteModel,
          title: 'Websites',
          path: 'core_websites'
        }
      },
      {
        path: '',
        loadChildren: '@core/cms/src/lib/admin/cms-admin.module#CmsCoreAdminModule',
      },
      {
        path: '',
        loadChildren: '@plugins/provider/src/lib/admin/provider-admin.module#PluginProviderAdminModule',
      },
      {
        path: '',
        loadChildren: '@plugins/store/src/lib/admin/store-admin.module#PluginStoreAdminModule',
      },
      
      {
        path: 'core_config_group/:id',
        loadChildren: './core-config-group/core-config-group.module#CoreConfigGroupModule'
      },
      {
        path: 'import-data',
        component: AdminImportComponent
      },
      {
        path: 'export-data',
        component: AdminExportComponent
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
