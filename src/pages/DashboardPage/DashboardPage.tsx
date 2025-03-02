import { useEffect, useState } from 'react';
import Heading from '../../components/common/Heading/Heading';
import axios from 'axios';
import {
  API,
  APIRoute,
  AppRoute,
  fieldSort,
  orderSortStatus,
  SortEnum,
  Type,
} from '../../constant';
import { Site, Test } from '../../types';
import LinkButton from '../../components/common/LinkButton/LinkButton';
import styles from '../DashboardPage/DashboardPage.module.scss';
import Wrapper from '../../components/common/Wrapper/Wrapper';
import { ReactComponent as Search } from '../../assets/icons/Search.svg';
import { getTextTransformCapitalize } from '../../utils';
import ButtonSortIcon from '../../components/common/ButtonSortIcon/ButtonSortIcon';
import Loader from '../../components/common/Loader/Loader';
import Button from '../../components/common/Button/Button';

function DashboardPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tests, setTests] = useState<Test[]>([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<SortEnum>(SortEnum.None);
  const [sortName, setSortName] = useState<string>('name');

  useEffect(() => {
    setLoading(true);
    Promise.all([getSites(), getTests()])
      .then(([sitesResponse, testsResponse]) => {
        const tests = testsResponse.map((test) => {
          const site = sitesResponse.find((site) => site.id === test.siteId);
          test.siteUrl =
            site?.url && new URL(site?.url).hostname.replace(/^www\./, '');
          return test;
        });

        setTests(tests);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const getSites = async () => {
    const { data } = await axios.get<Site[]>(`${API}/${APIRoute.Sites}`);
    return data;
  };

  const getTests = async () => {
    const { data } = await axios.get<Test[]>(`${API}/${APIRoute.Tests}`);
    return data;
  };

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

  const setSort = (sortFieldName: string) => {
    if (sortOrder === SortEnum.None) {
      setSortOrder(SortEnum.Ascending);
      setSortName(sortFieldName);
    } else if (sortOrder === SortEnum.Ascending) {
      setSortOrder(SortEnum.Descending);
      setSortName(sortFieldName);
    } else {
      setSortOrder(SortEnum.None);
    }
  };

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
        <Wrapper className={styles['input-info']}>{`${
          tests.filter(testFilter).length
        } tests`}</Wrapper>
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
          <thead>
            <tr>
              <th></th>
              <th>
                <ButtonSortIcon
                  className={styles['table-header']}
                  onClick={() => setSort('name')}
                  sortOrder={sortName === 'name' ? sortOrder : SortEnum.None}
                >
                  Name
                </ButtonSortIcon>
              </th>
              <th>
                <ButtonSortIcon
                  className={styles['table-header']}
                  onClick={() => setSort('type')}
                  sortOrder={sortName === 'type' ? sortOrder : SortEnum.None}
                >
                  Type
                </ButtonSortIcon>
              </th>
              <th>
                <ButtonSortIcon
                  className={styles['table-header']}
                  onClick={() => setSort('status')}
                  sortOrder={sortName === 'status' ? sortOrder : SortEnum.None}
                >
                  Status
                </ButtonSortIcon>
              </th>
              <th>
                <ButtonSortIcon
                  className={styles['table-header']}
                  onClick={() => setSort('siteUrl')}
                  sortOrder={sortName === 'siteUrl' ? sortOrder : SortEnum.None}
                >
                  Site
                </ButtonSortIcon>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tests
              .filter(testFilter)
              .slice()
              .sort(sortData)
              .map((test) => {
                const { id, name, type, status, siteId, siteUrl } = test;
                const indicatorColor = `siteId-${siteId}`;
                const typeTransform = [Type.MVT].includes(type)
                  ? type
                  : getTextTransformCapitalize(type).replace(/[_]/g, '-');
                const linkTo =
                  status === 'DRAFT'
                    ? `${AppRoute.FinalizeTestId}/${id}`
                    : `${AppRoute.ResultsTestId}/${id}`;

                return (
                  <tr className={styles['row-table']} key={id}>
                    <td
                      className={`${styles['row-indicator']} ${styles[indicatorColor]}`}
                    ></td>
                    <td className={styles['row-name']}>{name}</td>
                    <td className={styles['row-type']}>{typeTransform}</td>
                    <td className={`${styles['row-status']} ${styles[status]}`}>
                      {getTextTransformCapitalize(status)}
                    </td>
                    <td className={styles['row-site']}>{siteUrl}</td>
                    <td>
                      <LinkButton
                        to={linkTo}
                        className={status === 'DRAFT' ? 'gray-dark' : ''}
                      >
                        {status === 'DRAFT' ? 'Finalize' : 'Results'}
                      </LinkButton>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </>
  );
}

export default DashboardPage;
