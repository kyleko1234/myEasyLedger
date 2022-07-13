export const enterpriseMenu = [
  { path: '/dashboard', icon: 'fas fa-grip-horizontal', title: 'Dashboard', relevantBasePaths: ["dashboard"]},
  { path: '/journal-entries', icon: 'fas fa-book', title: 'Journal Entries', relevantBasePaths: ["journal-entries"]},
  { path: '/chart-of-accounts', icon: 'far fa-list-alt', title: 'Chart of Accounts', relevantBasePaths: ["chart-of-accounts", "account-details"]},
  { path: '/reports', icon: 'fas fa-envelope-open-text', title: 'Reports', relevantBasePaths: ["reports"]},
  { path: '/vendors', icon: 'fas fa-store-alt', title: 'Vendors', relevantBasePaths: ["vendors"]},
  { path: '/customers', icon: 'fas fa-address-card', title: 'Customers', relevantBasePaths: ["customers"]},

]

export const personalMenu = [
  { path: '/dashboard', icon: 'fas fa-grip-horizontal', title: 'Dashboard', relevantBasePaths: ["dashboard"]},
  { path: '/transactions', icon: 'fas fa-book', title: 'Transactions', relevantBasePaths: ["transactions"]},
  { path: '/accounts', icon: 'far fa-list-alt', title: 'Accounts', relevantBasePaths: ["accounts", "account-details"]},
  { path: '/categories', icon: 'fas fa-columns', title: 'Categories', relevantBasePaths: ["categories", "category-details"]},
  { path: '/reports', icon: 'fas fa-envelope-open-text', title: 'Reports', relevantBasePaths: ["reports"]}
]
