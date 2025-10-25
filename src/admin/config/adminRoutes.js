// Configuration des routes administrateur
export const ADMIN_ROUTES = {
  ROOT: '/admin',
  LOGIN: '/admin/login',
  DASHBOARD: '/admin/dashboard',
  PROPERTIES: '/admin/properties',
  PROPERTY_ADD: '/admin/properties/add',
  PROPERTY_EDIT: '/admin/properties/edit/:id',
  USERS: '/admin/users',
  CONTACTS: '/admin/contacts',
  TRANSACTIONS: '/admin/transactions',
  ANALYTICS: '/admin/analytics',
  SETTINGS: '/admin/settings',
  PROFILE: '/admin/profile',
};

export const ADMIN_NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    path: ADMIN_ROUTES.DASHBOARD,
    icon: 'LayoutDashboard',
  },
  {
    id: 'properties',
    label: 'Propriétés',
    path: ADMIN_ROUTES.PROPERTIES,
    icon: 'Home',
  },
  {
    id: 'users',
    label: 'Utilisateurs',
    path: ADMIN_ROUTES.USERS,
    icon: 'Users',
  },
  {
    id: 'contacts',
    label: 'Messages',
    path: ADMIN_ROUTES.CONTACTS,
    icon: 'MessageSquare',
  },
  {
    id: 'transactions',
    label: 'Transactions',
    path: ADMIN_ROUTES.TRANSACTIONS,
    icon: 'CreditCard',
  },
  {
    id: 'analytics',
    label: 'Statistiques',
    path: ADMIN_ROUTES.ANALYTICS,
    icon: 'BarChart3',
  },
  {
    id: 'settings',
    label: 'Paramètres',
    path: ADMIN_ROUTES.SETTINGS,
    icon: 'Settings',
  },
];

export default ADMIN_ROUTES;
