import { reducer } from './reducer';
import { SortEnum } from '../../constant';

describe('reducer', () => {
  // A test for the case when SortOrder = None
  it('should set sortOrder to Ascending when current sortOrder is None', () => {
    const action = { colName: 'name' };
    const state = { colName: '', sortOrder: SortEnum.None };

    const newState = reducer(state, action);

    expect(newState.sortOrder).toBe(SortEnum.Ascending);
  });

  // A test for the case when sortOrder = Ascending
  it('should set sortOrder to Descending when current sortOrder is Ascending', () => {
    const action = { colName: 'name' };
    const state = { colName: 'name', sortOrder: SortEnum.Ascending };

    const newState = reducer(state, action);

    expect(newState.sortOrder).toBe(SortEnum.Descending);
  });

  // A test for the case when sortOrder = Descending
  it('should set sortOrder to None when current sortOrder is Descending', () => {
    const action = { colName: 'name' };
    const state = { colName: 'name', sortOrder: SortEnum.Descending };

    const newState = reducer(state, action);

    expect(newState.sortOrder).toBe(SortEnum.None);
  });

  // A test for the case when colName does not match action.colName
  it('should set new colName and sortOrder to Ascending when colName is different', () => {
    const action = { colName: 'newName' };
    const state = { colName: 'oldName', sortOrder: SortEnum.None };

    const newState = reducer(state, action);

    expect(newState.colName).toBe('newName');
    expect(newState.sortOrder).toBe(SortEnum.Ascending);
  });

  // A test for the case when colName matches and SortOrder is already Ascending
  it('should change sortOrder to Descending when colName matches and current sortOrder is Ascending', () => {
    const action = { colName: 'name' };
    const state = { colName: 'name', sortOrder: SortEnum.Ascending };

    const newState = reducer(state, action);

    expect(newState.sortOrder).toBe(SortEnum.Descending);
  });

  // A test for the case when colName matches and SortOrder is already Descending
  it('should change sortOrder to None when colName matches and current sortOrder is Descending', () => {
    const action = { colName: 'name' };
    const state = { colName: 'name', sortOrder: SortEnum.Descending };

    const newState = reducer(state, action);

    expect(newState.sortOrder).toBe(SortEnum.None);
  });
});
