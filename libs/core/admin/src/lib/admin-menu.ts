import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/admin',
  },
  {
    title: 'Pages',
    icon: 'fas fa-file-alt',
    link: '/admin/pages',
  },
  {
    title: 'System',
    icon: 'fas fa-cog',
    children: [
      {
        title: 'Themes',
        link: '/admin/core_themes',
        data: {
          permission: [
            { label: 'webdjango', action: 'list_core_theme' },
          ]
        }
      },
      {
        title: 'Plugins',
        link: '/admin/core_plugins',
        data: {
          permission: [
            { label: 'webdjango', // Name of the plugin on WebDjango side 
             action: 'list_core_plugin' },
          ]
        }
      },
      {
        title: 'Users',
        link: '/admin/user',
        data: {
          permission: [
            { label: 'users', action: 'list_user' },
          ]
        }
      },
      {
        title: 'Groups',
        link: '/admin/group',
        data: {
          permission: [
            { label: 'auth', action: 'list_group' }
          ]
        }
      }
    ]
  },
];
