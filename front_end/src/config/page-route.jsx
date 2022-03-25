import React from 'react';
import { Redirect } from 'react-router';

import LoginPage from '../pages/user/login/login-page.js';
import RegisterPage from '../pages/user/register/register-page.js';

import ChartOfAccounts from '../pages/chart-of-accounts/chart-of-accounts.js';
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
import GeneralJournal from '../pages/journals/enterprise/general-journal.jsx';
import VerificationPage from '../pages/verification/verification-page.js';
import DefaultLandingPage from '../pages/default/default-landing-page.js';
import Transactions from '../pages/journals/personal/transactions.js';
import AcceptInvitationPage from '../pages/user/invitation/accept-invitation-page.js';
import ExpenseReport from '../pages/reports/expense-report.js';

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
    path: '/journals',
    title: 'Journals',
    component: GeneralJournal,
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
    component: BalanceSheetReport
  },
  {
    path: '/reports/balance-sheet/:endDate',
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
    path: '/reports/income-statement/:startDate/:endDate',
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
    exact: true,
    component: NetWorthReport,
  },
  {
    path: '/reports/net-worth/:endDate',
    title: 'Net Worth Report',
    component: NetWorthReport,
  },
  {
    path: '/reports/income-expense',
    title: 'Income and Expense Report',
    exact: true,
    component: IncomeExpenseReport,
  },
  {
    path: '/reports/income-expense/:startDate/:endDate',
    title: 'Income and Expense Report',
    component: IncomeExpenseReport,
  },
  {
    path: '/reports/cash-flow',
    title: 'Cash Flow Report',
    component: CashFlowReport,
  },
  {
    path: '/verification/:verificationToken/:locale',
    title: 'Verification',
    component: VerificationPage,
  },
  {
    path: '/transactions',
    title: 'Transactions',
    component: Transactions,
  },
  {
    path: '/accept-invitation/:token/:locale',
    title: 'Account Setup',
    component: AcceptInvitationPage
  },
  {
      path: '/reports/expense',
      title: 'Expense Report',
      exact: true,
      component: ExpenseReport
  },
  {
    path: '/reports/expense/:startDate/:endDate',
    title: 'Expense Report',
    component: ExpenseReport
  }

];


export default routes;