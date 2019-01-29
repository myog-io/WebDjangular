import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';

import {CoreConfigGroupModule} from './core-config-group/core-config-group.module';

import {AdminImportComponent} from './export-import/import/import.component';
import {AdminExportComponent} from './export-import/export/export.component';
import {ScaffoldModule} from '@core/builder/src/lib/scaffold/scaffold.module';
import {GroupModel, UserModel} from '@core/users/src/lib/models';
import {CoreMediaModule} from '@core/media/src/lib/core-media.module';
import {FormModel} from '@core/forms/src/lib/models';
import {CoreWebsiteModel, PluginModel, ThemeModel} from '@core/data/src/lib/models';
import {MenuBuilderModule} from '@core/cms/src/lib/menu-builder/menu_builder.module';
import {PluginProviderAdminModule} from '@plugins/provider/src/lib/admin/provider-admin.module';
import {PluginStoreAdminModule} from '@plugins/store/src/lib/admin/store-admin.module';
import {PageStaticModel} from "@core/cms/src/lib/models/PageStatic.model";
import {PagePostModel} from "@core/cms/src/lib/models/PagePost.model";
import {BlockHeaderModel} from "@core/cms/src/lib/models/BlockHeader.model";
import {BlockSimpleModel} from "@core/cms/src/lib/models/BlockSimple.model";
import {BlockWidgetHolderModel} from "@core/cms/src/lib/models/BlockWidgetHolder.model";
import {BlockFooterModel} from "@core/cms/src/lib/models/BlockFooter.model";
import {BlockLayoutModel} from "@core/cms/src/lib/models/BlockLayout.model";
import {PageTagModel} from "@core/cms/src/lib/models/PageTag.model";
import {PageCategoryModel} from "@core/cms/src/lib/models/PageCategory.model";


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
        path: 'posts',
        loadChildren: () => ScaffoldModule,
        data: {
          model: PagePostModel,
          title: "Post",
          path: 'posts'
        }
      },
      {
        path: 'pages',
        loadChildren: () => ScaffoldModule,
        data: {
          model: PageStaticModel,
          title: "Page",
          path: 'pages'
        }
      },
      {
        path: 'block',
        children: [
          {
            path: 'headers',
            loadChildren: () => ScaffoldModule,
            data: {
              model: BlockHeaderModel,
              title: "Headers",
              path: 'block/headers'
            }
          },
          {
            path: 'layouts',
            loadChildren: () => ScaffoldModule,
            data: {
              model: BlockLayoutModel,
              title: "Layouts",
              path: 'block/layouts'
            }
          },
          {
            path: 'footers',
            loadChildren: () => ScaffoldModule,
            data: {
              model: BlockFooterModel,
              title: "Footers",
              path: 'block/footers'
            }
          },
          {
            path: 'widget-holders',
            loadChildren: () => ScaffoldModule,
            data: {
              model: BlockWidgetHolderModel,
              title: "Widget-Holders",
              path: 'block/widget-holders'
            }
          },
          {
            path: 'custom',
            loadChildren: () => ScaffoldModule,
            data: {
              model: BlockSimpleModel,
              title: "Custom",
              path: 'block/custom'
            }
          },
        ]
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
        path: 'page-tags',
        loadChildren: () => ScaffoldModule,
        data: {
          model: PageTagModel,
          title: "Tags",
          path: 'page-tags'
        }
      },
      {
        path: 'page-categories',
        loadChildren: () => ScaffoldModule,
        data: {
          model: PageCategoryModel,
          title: "Categories",
          path: 'page-categories'
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
