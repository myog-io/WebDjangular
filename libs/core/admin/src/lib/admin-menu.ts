import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/',
  },
  {
    title: 'CMS',
    icon: 'fas fa-pencil-ruler',
    children: [
      {
        title: 'Posts',
        link: '/cms/posts',
      },
      {
        title: 'Pages',
        link: '/cms/pages',
      },
      {
        title: 'Blocks',
          children: [
          {
            title: 'Headers',
            link: '/cms/block/headers'
          },
          {
            title: 'Layouts',
            link: '/cms/block/layouts'
          },
          {
            title: 'Footers',
            link: '/cms/block/footers'
          },
          {
            title: 'Widget-Holders',
            link: '/cms/block/widget-holders'
          },
          {
            title: 'Custom',
            link: '/cms/block/custom'
          }
        ],
      },
      {
        title: 'Medias',
        link: '/media',
      },
     
      {
        title: 'Tags',
        link: '/cms/page-tags',
      },
      {
        title: 'Categories',
        link: '/cms/page-categories',
      },
      {
        title: 'Menus',
        link: '/cms/menu_builder',
      },
      {
        title: 'Forms',
        link: '/cms/form',
      },
      /* MENU BUILDER is the NExt */
    ]
  },
  {
    title: 'Store',
    icon: 'fas fa-shopping-cart',
    children: [
      {
        title: "Catalog",
        children: [
          {
            title: 'Products',
            link: '/store/catalog/products'
          },
          {
            title: 'Categories',
            link: '/store/catalog/categories'
          },
          {
            title: 'Product types',
            link: '/store/catalog/types'
          },
          {
            title: 'Product attribute',
            link: '/store/catalog/attributes'
          },
        ]
      },
      {
        title: 'Orders',
        link: '/store/orders',
      },
      {
        title: 'Store Rules',
        children: [
          {
            title: 'Catalog Rules',
            link: '/store/rules/catalog-rules',
          },
          {
            title: 'Cart Rules',
            link: '/store/rules/cart-rules',
          },
          {
            title: 'Cart Terms',
            link: '/store/rules/cart-terms',
          },
        ]
      },
      {
        title: 'Shipping methods',
        link: '/store/shipping-methods',
      },
    ]
  },
  {
    title: 'Provider',
    icon: 'fas fa-globe',
    children: [
      {
        title: 'Cities',
        link: '/provider/cities',
        data: {
          permission: [
            {label: 'provider', action: 'view_city'}
          ]
        }
      },
      {
        title: 'Page Redirect',
        link: '/provider/page-redirect',
        data: {
          permission: [
            {label: 'provider', action: 'view_pageredirect'}
          ]
        }
      },
      {
        title: 'Condos',
        link: '/provider/condo',
        data: {
          permission: [
            {label: 'provider', action: 'view_condo'}
          ]
        }
      },
      {
        title: 'Channels',
        link: '/provider/channel',
        data: {
          permission: [
            {label: 'provider', action: 'view_channel'}
          ]
        }
      },
      {
        title: 'Resellers',
        link: '/provider/reseller',
        data: {
          permission: [
            {label: 'provider', action: 'view_reseller'}
          ]
        }
      },
      {
        title: 'Plan Types',
        link: '/provider/plan-type',
        data: {
          permission: [
            {label: 'provider', action: 'view_plantype'}
          ]
        }
      },
      {
        title: 'Orders',
        link: '/provider/order',

      }
    ]
  },
  {
    title: 'System',
    icon: 'fas fa-cog',
    children: [
      {
        title: 'Emails',
        link: '/core_email',
        data: {
          permission: [
            {label: 'webdjango', action: 'view_email'},
          ]
        }
      },
      {
        title: 'Themes',
        link: '/core_themes',
        data: {
          permission: [
            {label: 'webdjango', action: 'view_theme'},
          ]
        }
      },
      {
        title: 'Plugins',
        link: '/core_plugins',
        data: {
          permission: [
            {
              label: 'webdjango', // Name of the plugin on WebDjango side
              action: 'view_plugin'
            },
          ]
        }
      },
      {
        title: 'Users',
        link: '/user',
        data: {
          permission: [
            {label: 'users', action: 'view_user'},
          ]
        }
      },
      {
        title: 'Groups',
        link: '/group',
        data: {
          permission: [
            {label: 'auth', action: 'view_group'}
          ]
        }
      },
      {
        title: 'Import/Export',
        children: [
          {
            title: "Import",
            link: '/import-data',
          },
          {
            title: 'Export',
            link: '/export-data'
          }
        ]
        // TODO: Permission superUser Only
      },
      {
        title: 'Configs',
        data: {
          core_configs: true,
        },
        children:
          [
            {
              title: 'Websites',
              link: '/core_websites',
              data: {
                permission: [
                  {label: 'webdjango', action: 'view_website'}
                ]
              }
            }
          ]
      }
    ]
  },
];
