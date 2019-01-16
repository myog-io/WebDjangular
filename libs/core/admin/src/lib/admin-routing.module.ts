import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { CoreConfigGroupModule } from './core-config-group/core-config-group.module';

import { AdminImportComponent } from './export-import/import/import.component';
import { AdminExportComponent } from './export-import/export/export.component';
import { ScaffoldModule } from '@core/builder/src/lib/scaffold/scaffold.module';
import { UserModel, GroupModel } from '@core/users/src/lib/models';
import { CoreMediaModule } from '@core/media/src/lib/core-media.module';
import { PageModel, BlockModel } from '@core/cms/src/lib/models';
import { FormModel } from '@core/forms/src/lib/models';
import { ThemeModel, PluginModel, CoreWebsiteModel } from '@core/data/src/lib/models';
import { MenuBuilderModule } from '@core/cms/src/lib/menu-builder/menu_builder.module';
import { PluginProviderAdminModule } from '@plugins/provider/src/lib/admin/provider-admin.module';
import { PluginStoreAdminModule } from '@plugins/store/src/lib/admin/store-admin.module';


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
        loadChildren: () => ScaffoldModule,
        data: {
          model: UserModel,
          title: "Users",
          path: 'user'
        }
      },
      {
        path: 'group',
        loadChildren: () => ScaffoldModule,
        data: {
          model: GroupModel,
          title: "Groups",
          path: 'group'
        }
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
        path: 'blocks',
        loadChildren: () => ScaffoldModule,
        data: {
          model: BlockModel,
          title: "Block",
          path: 'blocks'
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
        path: 'menu_builder',
        loadChildren: () => MenuBuilderModule,
      },
      
      {
        path: '',
        loadChildren: () => PluginProviderAdminModule,
      },
      {
        path: '',
        loadChildren: () => PluginStoreAdminModule,
      },
      {
        path: 'core_config_group/:id',
        loadChildren: () => CoreConfigGroupModule
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
