import { useEffect, useMemo, useReducer, useState } from 'react';
import Heading from '../../components/common/Heading/Heading';
import { SortEnum } from '../../constant';
import styles from '../DashboardPage/DashboardPage.module.scss';
import Wrapper from '../../components/common/Wrapper/Wrapper';
import { ReactComponent as Search } from '../../assets/icons/Search.svg';
import { useGetData } from '../../hooks/useGetData';
import TBody from '../../components/TBody/TBody';
import THead from '../../components/THead/THead';
import { Test } from '../../types';
import { reducer } from './reducer';
import Button from '../../components/common/Button/Button';
import { getFilterData, getSortData } from '../../utils/utils';
import Loader from '../../components/common/Loader/Loader';

export const INITIAL_STATE = {
  colName: '',
  sortOrder: SortEnum.None,
};

function DashboardPage() {
  const { tests, loading } = useGetData();
  const [search, setSearch] = useState('');
  const [dataTests, setDataTests] = useState<Test[] | []>([]);
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { colName, sortOrder } = state;

  const memoTests = useMemo(() => tests, [tests]);

  useEffect(() => {
    setDataTests(memoTests);
  }, [memoTests]);

  const setFilteredData = (value: string): void => {
    setSearch(value);
    if (value !== '') {
      setDataTests(getFilterData(tests, value));
    } else {
      setDataTests(tests);
    }
  };

  const setSortedData = (colName: string) => {
    dispatch({ colName });
  };

  const testResults = dataTests.slice().sort(getSortData(colName, sortOrder));

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Heading level="h1">Dashboard</Heading>
      <Wrapper className={styles['wrapper-input']}>
        <label className={styles['label-input']} htmlFor="input">
          <Search />
        </label>
        <input
          placeholder="What test are you looking for?"
          id="input"
          value={search}
          onChange={(e) => setFilteredData(e.target.value)}
        />
        <Wrapper className={styles['input-info']}>
          {`${testResults.length} tests`}
        </Wrapper>
      </Wrapper>
      {testResults.length === 0 && (
        <Wrapper className={styles['page-info']}>
          <Wrapper className={styles['page-info__text']}>
            Your search did not match any results.
          </Wrapper>
          <Button onClick={() => setFilteredData('')}>Reset</Button>
        </Wrapper>
      )}
      {testResults.length > 0 && (
        <table className={styles['table']}>
          <THead
            sortName={colName}
            sortOrder={sortOrder}
            setColSort={setSortedData}
          />
          <TBody tests={testResults} />
        </table>
      )}
    </>
  );
}

export default DashboardPage;
