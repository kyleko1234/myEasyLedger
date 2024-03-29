import React from 'react';
import { Redirect } from 'react-router';

import LoginPage from '../pages/user/login/login-page.js';
import RegisterPage from '../pages/user/register/register-page.js';

import ChartOfAccounts from '../pages/chart-of-accounts/chart-of-accounts.js';
import Dashboard from './../pages/dashboard/dashboard.js';
import Reports from './../pages/reports/reports.js';
import AccountDetails from '../pages/chart-of-accounts/account-details.js';
import AccountSettingsPage from '../pages/settings/account-settings-page.js';
import CreateANewOrganization from '../components/sidebar/create-a-new-organization.js';
import Categories from '../pages/categories/categories.js';
import CategoryDetails from '../pages/categories/category-details.js';
import VerificationPage from '../pages/verification/verification-page.js';
import DefaultLandingPage from '../pages/default/default-landing-page.js';
import AcceptInvitationPage from '../pages/user/invitation/accept-invitation-page.js';
import VendorsPage from '../pages/vendors/vendors-page.js';
import LedgerSettings from '../pages/settings/ledger-settings';
import CustomersPage from '../pages/customers/customers-page.js';
import JournalEntriesPage from '../pages/journal-entries/enterprise/journal-entries-page.js';
import TransactionsPage from '../pages/journal-entries/personal/transactions-page.js';
import AccountTransactionsReportPage from '../pages/reports/account-transactions-report-page.js';
import AccountsPage from '../pages/accounts/accounts-page.js';
import BalanceSheetPage from '../pages/reports/balance-sheet-page.js';
import IncomeStatementPage from '../pages/reports/income-statement-page.js';
import CashFlowPageV2 from '../pages/reports/cash-flow-page.js';
import ExpensesByAccountPage from '../pages/reports/expenses-by-account-page.js';
import NetWorthReportPage from '../pages/reports/net-worth-report-page.js';
import IncomeExpenseReportPage from '../pages/reports/income-expense-report-page.js';
import ExpensesByVendorPage from '../pages/reports/expenses-by-vendor-page.js';
import IncomeByCustomerPage from '../pages/reports/income-by-customer-page.js';

const routes = [
  {
    path: '/',
    exact: true,
    component: DefaultLandingPage
  },
  {
    path: '/user/login',
    title: 'Login',
    component: LoginPage,
  },
  {
    path: '/user/register',
    title: 'Register',
    component: RegisterPage,
  },
  {
    path: '/chart-of-accounts',
    title: 'Chart Of Accounts',
    exact: true,
    component: () => <Redirect to="/chart-of-accounts/1" />,
  },
  {
    path: '/chart-of-accounts/:activeTabId',
    title: 'Chart Of Accounts',
    component: ChartOfAccounts,
  },
  {
    path: '/account-details/:id',
    title: 'Account Details',
    component: AccountDetails,
  },
  {
    path: '/dashboard',
    exact: true,
    title: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/reports',
    exact: true,
    title: 'Reports',
    component: Reports
  },
  {
    path: '/reports/balance-sheet',
    title: 'Balance Sheet Report',
    exact: true,
    component: BalanceSheetPage
  },
  {
    path: '/reports/balance-sheet/:endDate',
    title: 'Balance Sheet Report',
    component: BalanceSheetPage
  },
  {
    path: '/reports/income-statement',
    exact: true,
    title: 'Income Statement Report',
    component: IncomeStatementPage
  },
  {
    path: '/reports/income-statement/:startDate/:endDate',
    title: 'Income Statement Report',
    component: IncomeStatementPage
  },
  {
    path: '/account-settings',
    title: 'Account Settings',
    component: AccountSettingsPage
  },
  {
    path: '/ledger-settings/:organizationId',
    title: 'LedgerSettings',
    component: LedgerSettings
  },
  {
    path: '/create-a-new-ledger',
    title: 'Create a New Ledger',
    component: CreateANewOrganization
  },
  {
    path: '/accounts',
    title: 'Accounts',
    exact: true,
    component: () => <Redirect to="/accounts/1" />,
  },
  {
    path: '/accounts/:activeTabId',
    title: 'Accounts',
    component: AccountsPage
  },
  {
    path: '/categories',
    title: 'Categories',
    exact: true,
    component: () => <Redirect to="/categories/4" />,
  },
  {
    path: '/categories/:activeTabId',
    title: 'Categories',
    component: Categories
  },
  {
    path: '/category-details/:id',
    title: 'Category Details',
    component: CategoryDetails,
  },
  {
    path: '/reports/net-worth',
    title: 'Net Worth Report',
    exact: true,
    component: NetWorthReportPage,
  },
  {
    path: '/reports/net-worth/:endDate',
    title: 'Net Worth Report',
    component: NetWorthReportPage,
  },
  {
    path: '/reports/income-expense',
    title: 'Income and Expense Report',
    exact: true,
    component: IncomeExpenseReportPage,
  },
  {
    path: '/reports/income-expense/:startDate/:endDate',
    title: 'Income and Expense Report',
    component: IncomeExpenseReportPage,
  },
  {
    path: '/reports/cash-flow',
    title: 'Cash Flow Report',
    component: CashFlowPageV2,
  },
  {
    path: '/verification/:verificationToken/:locale',
    title: 'Verification',
    component: VerificationPage,
  },
  {
    path: '/accept-invitation/:token/:locale',
    title: 'Account Setup',
    component: AcceptInvitationPage
  },
  {
      path: '/reports/expenses-by-account',
      title: 'Expense Distribution (by Account)',
      exact: true,
      component: ExpensesByAccountPage
  },
  {
    path: '/reports/expenses-by-account/:startDate/:endDate',
    title: 'Expense Distribution (by Account)',
    component: ExpensesByAccountPage
  },
  {
    path: '/vendors',
    title: 'Vendors',
    component: VendorsPage
  },
  {
    path: '/customers',
    title: 'Customers',
    component: CustomersPage
  },
  {
    path: '/journal-entries',
    title: 'Journal Entries',
    component: JournalEntriesPage
  },
  {
    path: '/transactions',
    title: 'Transactions',
    component: TransactionsPage,
  },
  {
    path: '/reports/account-transactions-report',
    title: 'Account Transactions Report',
    component: AccountTransactionsReportPage,
  },
  {
    path: '/reports/expenses-by-vendor',
    title: 'Expense Distribution (by Vendor)',
    component: ExpensesByVendorPage,
  },
  {
    path: '/reports/income-by-customer',
    title: 'Income Distribution (by Customer)',
    component: IncomeByCustomerPage,
  }
];


export default routes;