// Configuration des routes administrateur
export const ADMIN_ROUTES = {
  ROOT: '/admin',
  LOGIN: '/admin/login',
  DASHBOARD: '/admin/dashboard',
  PROPERTIES: '/admin/properties',
  PROPERTY_ADD: '/admin/properties/add',
  PROPERTY_EDIT: '/admin/properties/edit/:id',
  PROPERTIES_PURCHASED: '/admin/properties/purchased',
  PROPERTIES_SOLD: '/admin/properties/sold',
  PROPERTIES_PROCESS: '/admin/properties/process',
  USERS: '/admin/users',
  USER_CREATE: '/admin/users/create',
  USER_EDIT: '/admin/users/edit/:id',
  USER_PERMISSIONS: '/admin/users/permissions/:id',
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
    subItems: [
      {
        id: 'properties-all',
        label: 'Toutes les propriétés',
        path: ADMIN_ROUTES.PROPERTIES,
        icon: 'List',
      },
      {
        id: 'properties-purchased',
        label: 'Terrains achetés',
        path: ADMIN_ROUTES.PROPERTIES_PURCHASED,
        icon: 'ShoppingCart',
      },
      {
        id: 'properties-sold',
        label: 'Terrains vendus',
        path: ADMIN_ROUTES.PROPERTIES_SOLD,
        icon: 'CheckCircle',
      },
      {
        id: 'properties-process',
        label: 'Terrains en processus d\'achat',
        path: ADMIN_ROUTES.PROPERTIES_PROCESS,
        icon: 'RefreshCw',
      },
    ],
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
