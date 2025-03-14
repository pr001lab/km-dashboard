export const API = 'http://localhost:3100';

export enum LoadingStatus {
  Idle = 'idle',
  Loading = 'loading',
  Successed = 'successed',
  Failed = 'failed',
}

export enum APIRoute {
  Sites = 'sites',
  Tests = 'tests',
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
