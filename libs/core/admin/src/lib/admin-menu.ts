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
        title: 'Pages',
        link: '/pages',
      },
      {
        title: 'Medias',
        link: '/media',
      },
      {
        title: 'Forms',
        link: '/forms',
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
            link: '/store/catalog/product-types'
          },
        ]
      },
      {
        title: 'Orders',
        link: '/store/orders',
      },
      {
        title: 'Discounts',
        children: [
          {
            title: 'Catalog Rules',
            link: '/store/discount/catalog-rules',
          },
          {
            title: 'Cart Rules',
            link: '/store/discount/cart-rules',
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
      }
    ]
  },
  {
    title: 'System',
    icon: 'fas fa-cog',
    children: [
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
