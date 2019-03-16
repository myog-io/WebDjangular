import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagePostModel } from '../models/PagePost.model';
import { PageStaticModel } from '../models/PageStatic.model';
import { BlockHeaderModel } from '../models/BlockHeader.model';
import { BlockLayoutModel } from '../models/BlockLayout.model';
import { BlockFooterModel } from '../models/BlockFooter.model';
import { BlockWidgetHolderModel } from '../models/BlockWidgetHolder.model';
import { BlockSimpleModel } from '../models/BlockSimple.model';
import { FormModel } from '../models/Form.model';
import { PageTagModel } from '../models/PageTag.model';
import { PageCategoryModel } from '../models/PageCategory.model';

const routes: Routes = [
  {
    path: 'cms',
    children: [
      {
        path: 'posts',
        loadChildren:
          '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: PagePostModel,
          title: 'Post',
          path: 'cms/posts'
        }
      },
      {
        path: 'pages',
        loadChildren:
          '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: PageStaticModel,
          title: 'Page',
          path: 'cms/pages'
        }
      },
      {
        path: 'block',
        children: [
          {
            path: 'headers',
            loadChildren:
              '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
            data: {
              model: BlockHeaderModel,
              title: 'Headers',
              path: 'cms/block/headers'
            }
          },
          {
            path: 'layouts',
            loadChildren:
              '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
            data: {
              model: BlockLayoutModel,
              title: 'Layouts',
              path: 'cms/block/layouts'
            }
          },
          {
            path: 'footers',
            loadChildren:
              '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
            data: {
              model: BlockFooterModel,
              title: 'Footers',
              path: 'cms/block/footers'
            }
          },
          {
            path: 'widget-holders',
            loadChildren:
              '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
            data: {
              model: BlockWidgetHolderModel,
              title: 'Widget-Holders',
              path: 'cms/block/widget-holders'
            }
          },
          {
            path: 'custom',
            loadChildren:
              '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
            data: {
              model: BlockSimpleModel,
              title: 'Custom',
              path: 'cms/block/custom'
            }
          }
        ]
      },
      {
        path: 'form',
        loadChildren:
          '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: FormModel,
          title: 'Form',
          path: 'cms/form'
        }
      },
      {
        path: 'page-tags',
        loadChildren:
          '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: PageTagModel,
          title: 'Tags',
          path: 'cms/page-tags'
        }
      },
      {
        path: 'page-categories',
        loadChildren:
          '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: PageCategoryModel,
          title: 'Categories',
          path: 'cms/page-categories'
        }
      },
      {
        path: 'menu_builder',
        loadChildren:
          '@core/cms/src/lib/menu-builder/menu_builder.module#MenuBuilderModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsCoreAdminRoutingModule {}
