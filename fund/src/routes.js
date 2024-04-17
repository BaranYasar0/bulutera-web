import { lazy } from 'react';

import { NotFound } from 'component/ui';

const FundDefinition = lazy(() => import('./pages/fund-definition'));
const FundList = lazy(() => import('./pages/fund-list'));
const IssuerList = lazy(() => import('./pages/issuer-list'));
const IssuerDefinition = lazy(() => import('./pages/issuer-definition'));
const FundBuyingDefinition = lazy(() => import('./pages/fund-buying'));
const FundSellingDefinition = lazy(() => import('./pages/fund-selling'));
const FundCancellingDefinition = lazy(() => import('./pages/fund-cancelling'));
const SecurityPriceDefinition = lazy(() => import('./pages/security-price-definition'));
const SecurityPriceList = lazy(() => import('./pages/security-price-list'));
const FundPortfolioList = lazy(() => import('./pages/fund-portfolio'));
const FundMergeDefinition = lazy(() => import('./pages/fund-merge'));
const FundBankStockList = lazy(() => import('./pages/fund-bank-stock-list'));
const FundPendingOrderList = lazy(() => import('./pages/fund-pending-order-list'));
const FundPriceTrack = lazy(() => import('./pages/fund-price-track'));


export default [
  {
    name: 'FundDefinition',
    module: '/fund',
    path: '/fund-definition',
    component: FundDefinition,
    uiKey: 'udc683e0c45'
  },
  {
    name: 'FundList',
    module: '/fund',
    path: '/fund-list',
    component: FundList,
    uiKey: 'u3aaa4a4492'
  },
  {
    name: 'IssuerList',
    module: '/fund',
    path: '/issuer-list',
    component: IssuerList,
    uiKey: 'u94caed2091'
  },
  {
    name: 'IssuerDefinition',
    module: '/fund',
    path: '/issuer-definition',
    component: IssuerDefinition,
    uiKey: 'u4c2b37214d'
  },
  {
    name: 'FundBuyingDefinition',
    module: '/fund',
    path: '/fund-buying',
    component: FundBuyingDefinition,
    uiKey: 'ube44b9e2c8'
  },
  {
    name: 'FundSellingDefinition',
    module: '/fund',
    path: '/fund-selling',
    component: FundSellingDefinition,
    uiKey: 'ud13f6fa834'
  },
  {
    name: 'SecurityPriceDefinition',
    module: '/fund',
    path: '/security-price-definition',
    component: SecurityPriceDefinition,
    uiKey: 'uc317b7e65b'
  },
  {
    name: 'SecurityPriceList',
    module: '/fund',
    path: '/security-price-list',
    component: SecurityPriceList,
    uiKey: 'u4ab03f0dce'
  },
  {
    name: 'FundPortfolioList',
    module: '/fund',
    path: '/fund-portfolio',
    component: FundPortfolioList,
    uiKey: 'ubf3f063b7e'
  },
  {
    name: 'FundMergeDefinition',
    module: '/fund',
    path: '/fund-merge',
    component: FundMergeDefinition,
    uiKey: 'u982f302611'
  },
  {
    name: 'FundBankStockList',
    module: '/fund',
    path: '/fund-bank-stock',
    component: FundBankStockList,
    uiKey: 'ud3a49d4e84'
  },
  {
    name: 'FundPendingOrderList',
    module: '/fund',
    path: '/fund-pending-order',
    component: FundPendingOrderList,
    uiKey: 'u9d48efe554'
  },

  {
    name: 'FundCancellingDefinition',
    module: '/fund',
    path: '/fund-cancelling',
    component: FundCancellingDefinition,
    uiKey: 'u53567119af'
  },

  {
    name: 'FundPriceTrack',
    module: '/fund',
    path: '/fund-price-track',
    component: FundPriceTrack,
    uiKey: 'ub57af0c498'
  },
  {
    name: 'NotFound',
    module: '/fund',
    path: '*',
    component: NotFound,
  },
];
