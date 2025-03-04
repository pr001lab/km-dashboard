import { useState } from 'react';
import Heading from '../../components/common/Heading/Heading';
import { fieldSort, orderSortStatus, SortEnum } from '../../constant';
import styles from '../DashboardPage/DashboardPage.module.scss';
import Wrapper from '../../components/common/Wrapper/Wrapper';
import { ReactComponent as Search } from '../../assets/icons/Search.svg';
import Loader from '../../components/common/Loader/Loader';
import Button from '../../components/common/Button/Button';
import { useGetData } from '../../hooks/useGetData';
import TBody from '../../components/TBody/TBody';
import THead from '../../components/THead/THead';
import { Test } from '../../types';

function DashboardPage() {
  const { tests, loading } = useGetData();
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<SortEnum>(SortEnum.None);
  const [sortName, setSortName] = useState<string>('name');

  const testFilter = (test: Test) => {
    if (search === '') {
      return true;
    }
    return test.name.toLowerCase().includes(search.toLowerCase());
  };

  const sortData = (a: { [key: string]: any }, b: { [key: string]: any }) => {
    if (sortName === fieldSort.STATUS) {
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
        return a[sortName].localeCompare(b[sortName]);
      } else if (sortOrder === SortEnum.Descending) {
        return b[sortName].localeCompare(a[sortName]);
      }
      return 0;
    }
  };

  const setColSort = (sortColName: string) => {
    if (sortName === sortColName) {
      if (sortOrder === SortEnum.None) {
        setSortOrder(SortEnum.Ascending);
      } else if (sortOrder === SortEnum.Ascending) {
        setSortOrder(SortEnum.Descending);
      } else {
        setSortOrder(SortEnum.None);
      }
    } else {
      setSortName(sortColName);
      setSortOrder(SortEnum.Ascending);
    }
  };

  const testResults = tests.filter(testFilter).slice().sort(sortData);

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
          onChange={(e) => setSearch(e.target.value)}
        />
        <Wrapper className={styles['input-info']}>
          {`${tests.filter(testFilter).length} tests`}
        </Wrapper>
      </Wrapper>
      {tests.filter(testFilter).length === 0 && (
        <Wrapper className={styles['page-info']}>
          <Wrapper className={styles['page-info__text']}>
            Your search did not match any results.
          </Wrapper>
          <Button onClick={() => setSearch('')}>Reset</Button>
        </Wrapper>
      )}
      {tests.filter(testFilter).length > 0 && (
        <table className={styles['table']}>
          <THead
            sortName={sortName}
            sortOrder={sortOrder}
            setColSort={setColSort}
          />
          <TBody tests={testResults} />
        </table>
      )}
    </>
  );
}

export default DashboardPage;
