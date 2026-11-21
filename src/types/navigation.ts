export type PageId =
  | 'home'
  | 'menu'
  | 'health'
  | 'orders'
  | 'story'
  | 'branches'
  | 'reserve'
  | 'contact'
  | 'privacy';

export interface PageMeta {
  id: PageId;
  label: string;
  stageNames: [string, string, string, string];
}

export const PAGE_ROUTE_MAP: Record<PageId, PageMeta> = {
  home: {
    id: 'home',
    label: 'Home',
    stageNames: ['01 · Ghee', '02 · Mirch', '03 · Angithi', '04 · Lime'],
  },
  menu: {
    id: 'menu',
    label: 'Menu',
    stageNames: ['01 · Observatory', '02 · Orbital Spin', '03 · Health Index', '04 · Full Grid'],
  },
  health: {
    id: 'health',
    label: 'Health Benefits',
    stageNames: ['01 · Immunity', '02 · Digestion', '03 · Clean Fats', '04 · Purity'],
  },
  orders: {
    id: 'orders',
    label: 'Orders',
    stageNames: ['01 · Attached Tray', '02 · Dish Photos', '03 · Details', '04 · WhatsApp'],
  },
  story: {
    id: 'story',
    label: 'Our Story',
    stageNames: ['01 · Manifesto', '02 · Green Pantry', '03 · 3D Chillies', '04 · Clay Craft'],
  },
  branches: {
    id: 'branches',
    label: 'Branches',
    stageNames: ['01 · Karachi', '02 · Lahore', '03 · Islamabad', '04 · Catering'],
  },
  reserve: {
    id: 'reserve',
    label: 'Reserve',
    stageNames: ['01 · Entrance', '02 · Brass Arch', '03 · Lanterns', '04 · Dastarkhwan'],
  },
  contact: {
    id: 'contact',
    label: 'Contact Us',
    stageNames: ['01 · Signal', '02 · WhatsApp', '03 · Desks', '04 · Inquiry'],
  },
  privacy: {
    id: 'privacy',
    label: 'Privacy Policy',
    stageNames: ['01 · Vault', '02 · Data Charter', '03 · WhatsApp', '04 · Rights'],
  },
};
