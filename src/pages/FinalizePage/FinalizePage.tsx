import Heading from '../../components/common/Heading/Heading';
import styles from '../ResultsPage/ResultsPage.module.scss';
import Footer from '../../components/common/Footer/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as Chevron } from '../../assets/icons/Chevron.svg';
import Loader from '../../components/common/Loader/Loader';
import { useEffect, useState } from 'react';
import { Site, Test } from '../../types';
import axios from 'axios';
import { API, APIRoute, AppRoute, Type } from '../../constant';
import Wrapper from '../../components/common/Wrapper/Wrapper';
import { getTextTransformCapitalize } from '../../utils';
import LinkButton from '../../components/common/LinkButton/LinkButton';

function FinalizePage() {
  const navigate = useNavigate();
  const { testId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [tests, setTests] = useState<Test[]>([]);

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
    const { data } = await axios.get<Test[]>(
      `${API}/${APIRoute.Tests}/${testId}`,
    );
    return Array.isArray(data) ? data : [data];
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Wrapper className={styles['wrapper']}>
        <Heading level="h1">Finalize</Heading>
        <Heading level="h2">Spring promotion</Heading>
        <table className={styles['table']}>
          <thead>
            <tr>
              <th></th>
              <th>
                <Wrapper className={styles['table-header']}>Name</Wrapper>
              </th>
              <th>
                <Wrapper className={styles['table-header']}>Type</Wrapper>
              </th>
              <th>
                <Wrapper className={styles['table-header']}>Status</Wrapper>
              </th>
              <th>
                <Wrapper className={styles['table-header']}>Site</Wrapper>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tests
              .slice()
              .sort()
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
      </Wrapper>
      <Footer>
        <Link
          className={styles['link-back']}
          onClick={() => navigate(-1)}
          to={'#'}
        >
          <Chevron />
          <span className={styles['link-label']}>Back</span>
        </Link>
      </Footer>
    </>
  );
}

export default FinalizePage;
