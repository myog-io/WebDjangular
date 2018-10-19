import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/',
  },
  {
    title: 'Medias',
    icon: 'fas fa-file-image',
    link: '/media',
  },
  {
    title: 'Pages',
    icon: 'fas fa-file-alt',
    link: '/pages',
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
            { label: 'webdjango', action: 'list_core_theme' },
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
              action: 'list_core_plugin'
            },
          ]
        }
      },
      {
        title: 'Users',
        link: '/user',
        data: {
          permission: [
            { label: 'users', action: 'list_user' },
          ]
        }
      },
      {
        title: 'Groups',
        link: '/group',
        data: {
          permission: [
            { label: 'auth', action: 'list_group' }
          ]
        }
      },
      {
        title: 'Configs',
        children:
          [
            {
              title: 'Websites',
              link: '/core_websites',
              data: {
                permission: [
                  { label: 'webdjango', action: 'list_core_website' }
                ]
              }
            }
          ]
      }
    ]
  },
];
