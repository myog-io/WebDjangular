import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';


import {AdminImportComponent} from './export-import/import/import.component';
import {AdminExportComponent} from './export-import/export/export.component';
import {GroupModel, UserModel} from '@core/users/src/lib/models';
import {FormModel} from '@core/forms/src/lib/models';
import {CoreWebsiteModel, PluginModel, ThemeModel} from '@core/data/src/lib/models';
import {PageStaticModel} from "@core/cms/src/lib/models/PageStatic.model";
import {PagePostModel} from "@core/cms/src/lib/models/PagePost.model";
import {BlockHeaderModel} from "@core/cms/src/lib/models/BlockHeader.model";
import {BlockSimpleModel} from "@core/cms/src/lib/models/BlockSimple.model";
import {BlockWidgetHolderModel} from "@core/cms/src/lib/models/BlockWidgetHolder.model";
import {BlockFooterModel} from "@core/cms/src/lib/models/BlockFooter.model";
import {BlockLayoutModel} from "@core/cms/src/lib/models/BlockLayout.model";
import {PageTagModel} from "@core/cms/src/lib/models/PageTag.model";
import {PageCategoryModel} from "@core/cms/src/lib/models/PageCategory.model";
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
        path: 'posts',
        loadChildren: '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: PagePostModel,
          title: "Post",
          path: 'posts'
        }
      },
      {
        path: 'pages',
        loadChildren: '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
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
            loadChildren: '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
            data: {
              model: BlockHeaderModel,
              title: "Headers",
              path: 'block/headers'
            }
          },
          {
            path: 'layouts',
            loadChildren: '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
            data: {
              model: BlockLayoutModel,
              title: "Layouts",
              path: 'block/layouts'
            }
          },
          {
            path: 'footers',
            loadChildren: '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
            data: {
              model: BlockFooterModel,
              title: "Footers",
              path: 'block/footers'
            }
          },
          {
            path: 'widget-holders',
            loadChildren: '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
            data: {
              model: BlockWidgetHolderModel,
              title: "Widget-Holders",
              path: 'block/widget-holders'
            }
          },
          {
            path: 'custom',
            loadChildren: '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
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
        loadChildren: '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: FormModel,
          title: "Form",
          path: 'forms'
        }
      },
      {
        path: 'page-tags',
        loadChildren: '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: PageTagModel,
          title: "Tags",
          path: 'page-tags'
        }
      },
      {
        path: 'page-categories',
        loadChildren: '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: PageCategoryModel,
          title: "Categories",
          path: 'page-categories'
        }
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
        path: 'menu_builder',
        loadChildren: '@core/cms/src/lib/menu-builder/menu_builder.module#MenuBuilderModule',
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
