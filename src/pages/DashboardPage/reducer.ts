import { SortEnum } from '../../constant';
import { INITIAL_STATE } from './DashboardPage';

export const reducer = (
  state: typeof INITIAL_STATE,
  action: Record<string, string>,
) => {
  if (state.colName === action.colName) {
    if (state.sortOrder === SortEnum.None) {
      return {
        ...state,
        sortOrder: SortEnum.Ascending,
      };
    } else if (state.sortOrder === SortEnum.Ascending) {
      return {
        ...state,
        sortOrder: SortEnum.Descending,
      };
    } else {
      return {
        ...state,
        sortOrder: SortEnum.None,
      };
    }
  } else {
    return {
      ...state,
      colName: action.colName,
      sortOrder: SortEnum.Ascending,
    };
  }
};
