import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS2 = [
  {
    label: 'Admin Menus',
    main: [
      {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'sub',
        icon: 'ti-home'
      },
      {
        state: 'users',
        name: 'Banners',
        type: 'link',
        icon: 'fa fa-users'
      },
      {
        state: 'customers',
        name: 'Counter',
        type: 'link',
        icon: 'fa fa-plus-circle'
      },
      {
        state: 'adminMyteam',
        name: 'Latest Activities',
        type: 'link',
        icon: 'fa fa-calendar'
      },
      {
        state: 'products',
        name: 'Testimonials',
        type: 'link',
        icon: 'ti-user'
      },
      {
        state: 'adminMaster',
        name: 'Inspiration',
        type: 'link',
        icon: 'ti-wheelchair'
      },
      {
        state: 'story',
        name: 'How Did We Get Started?',
        type: 'link',
        icon: 'ti-quote-left'
      },
      {
        state: 'folder',
        name: 'Gallery',
        type: 'link',
        icon: 'ti-gallery'
      },
      {
        state: 'subfolder',
        name: 'Image',
        type: 'link',
        icon: 'ti-image'
      },
      {
        state:'vision',
        name:'Vision',
        type:'link',
        icon:'ti-eye'
      },
      {
        state:'videos',
        name:'Videos',
        type:'link',
        icon:'ti-video-clapper'
      },
      {
        state:'books',
        name:'Books',
        type:'link',
        icon:'ti-book'
      }
    ],
  },
];

@Injectable()
export class MenuItems2 {
  getAll(): Menu[] {
    return MENUITEMS2;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}