import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/admin',
  },
  {
    title: 'System',
    icon: 'fas fa-cog',
    children: [
      {
        title: 'Users',
        link: '/admin/user',
      },
      {
        title: 'Groups',
        link: '/admin/group'
      }
    ]
  },
];
