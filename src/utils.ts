import { Test } from './types';
import { fieldSort, orderSortStatus, SortEnum } from './constant';

export const getTextTransformCapitalize = (word: string) => {
  return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
};

export function getFilterData(data: Test[], value: string) {
  return [
    ...data.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    }),
  ];
}

export const getSortData =
  (colName: string, sortOrder: SortEnum) =>
  (a: { [key: string]: any }, b: { [key: string]: any }) => {
    if (colName === fieldSort.STATUS) {
      if (sortOrder === SortEnum.Ascending) {
        return (
          orderSortStatus.indexOf(a.status) - orderSortStatus.indexOf(b.status)
        );
      } else if (sortOrder === SortEnum.Descending) {
        return (
          orderSortStatus.slice().reverse().indexOf(a.status) -
          orderSortStatus.slice().reverse().indexOf(b.status)
        );
      }
      return 0;
    } else {
      if (sortOrder === SortEnum.Ascending) {
        return a[colName].localeCompare(b[colName]);
      } else if (sortOrder === SortEnum.Descending) {
        return b[colName].localeCompare(a[colName]);
      }
      return 0;
    }
  };

export const getNameUrl = (url: string) => {
  return new URL(url).hostname.replace(/^www\./, '');
};
