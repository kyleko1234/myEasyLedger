import React from 'react';
import { Redirect } from 'react-router';

import LoginV3 from './../pages/user/login-v3.js';
import RegisterV3 from './../pages/user/register-v3.js';

import Journals from '../pages/journals/journals.js';
import ChartOfAccounts from '../pages/chart-of-accounts/chart-of-accounts.js';
import Logout from './../pages/user/logout.js';
import Dashboard from './../pages/dashboard/dashboard.js';
import Reports from './../pages/reports/reports.js';
import IncomeStatementReport from '../pages/reports/income-statement-report.js';
import BalanceSheetReport from '../pages/reports/balance-sheet-report.js';
import AccountDetails from '../pages/chart-of-accounts/account-details.js';
import Settings from '../pages/settings/settings.js';
import ManageEasyLedger from '../pages/settings/manage-easyledger';
import CreateANewOrganization from '../components/sidebar/create-a-new-organization.js';
import Accounts from '../pages/accounts/accounts.js';
import Categories from '../pages/categories/categories.js';
import CategoryDetails from '../pages/categories/category-details.js';
import NetWorthReport from '../pages/reports/net-worth-report.js';
import IncomeExpenseReport from '../pages/reports/income-expense-report.js';
import CashFlowReport from '../pages/reports/cash-flow-report.js';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to='/dashboard'/>
  },
  {
    path: '/user/login',
    title: 'Login',
    component: LoginV3,
  },
  {
    path: '/user/register',
    title: 'Register',
    component: RegisterV3,
  },
  {
    path: '/journals',
    title: 'Journals',
    component: Journals,
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
    path: '/user/logout',
    title: 'Log out',
    component: Logout
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
    exact: true,
    title: 'Balance Sheet Report',
    component: BalanceSheetReport
  },
  {
    path: '/reports/income-statement',
    exact: true,
    title: 'Income Statement Report',
    component: IncomeStatementReport
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings
  },
  {
    path: '/manage-easyledger/:organizationId',
    title: 'Manage EasyLedger',
    component: ManageEasyLedger
  },
  {
    path: '/create-a-new-easyledger',
    title: 'Create a New EasyLedger',
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
    component: Accounts
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
    component: NetWorthReport,
  },
  {
    path: '/reports/income-expense',
    title: 'Income and Expense Report',
    component: IncomeExpenseReport,
  },
  {
    path: '/reports/cash-flow',
    title: 'Cash Flow Report',
    component: CashFlowReport,
  },


];


export default routes;