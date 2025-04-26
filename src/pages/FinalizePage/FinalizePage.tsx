import Heading from '../../components/common/Heading/Heading';
import styles from '../ResultsPage/ResultsPage.module.scss';
import Footer from '../../components/common/Footer/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as Chevron } from '../../assets/icons/Chevron.svg';
import Loader from '../../components/common/Loader/Loader';
import Wrapper from '../../components/common/Wrapper/Wrapper';
import { useGetData } from '../../hooks/useGetData';
import TBody from '../../components/TBody/TBody';
import THead from '../../components/THead/THead';

function FinalizePage() {
  const navigate = useNavigate();
  const { testId } = useParams();
  const { tests, loading } = useGetData(testId);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Wrapper className={styles['wrapper']}>
        <Heading level="h1">Finalize</Heading>
        <Heading level="h2" className={styles['h2']}>
          Spring promotion
        </Heading>
        <table className={styles['table']}>
          <THead />
          <TBody tests={tests} />
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
