// export const API = 'http://localhost:3100';

export const API =
  process.env.NODE_ENV === 'development'
    ? ``
    : `https://raw.githubusercontent.com/pr001lab/km-dashboard/gh-pages/`;

export enum LoadingStatus {
  Idle = 'idle',
  Loading = 'loading',
  Successed = 'successed',
  Failed = 'failed',
}

export enum APIRoute {
  Sites = 'sites',
  Tests = 'tests',
  SitesJSONFile = 'sites.json',
  TestsJSONFile = 'tests.json',
}

export enum AppRoute {
  Main = '/',
  ResultsTestId = '/results',
  FinalizeTestId = '/finalize',
}

export enum TitlePageAppRoute {
  Main = 'Dashboard',
  Results = 'Results',
  Finalize = 'Finalize',
  Error = '404',
}

export enum Type {
  CLASSIC = 'CLASSIC',
  SERVER_SIDE = 'SERVER_SIDE',
  MVT = 'MVT',
}

export enum Status {
  DRAFT = 'DRAFT',
  ONLINE = 'ONLINE',
  PAUSED = 'PAUSED',
  STOPPED = 'STOPPED',
}

export enum SortEnum {
  Ascending = 'Ascending',
  Descending = 'Descending',
  None = 'None',
}

export enum fieldSort {
  STATUS = 'status',
}

export const tableColumns = ['name', 'type', 'status', 'site'];

export const orderSortStatus = ['ONLINE', 'PAUSED', 'STOPPED', 'DRAFT'];
