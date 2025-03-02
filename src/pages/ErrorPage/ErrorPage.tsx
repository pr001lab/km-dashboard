import styles from './ErrorPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Heading from '../../components/common/Heading/Heading';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className={styles['error-page']}>
      <div>
        <Heading className={styles.h1}>404</Heading>
        <Heading className={styles.h2} level="h2">
          {' '}
          This page could not be found.{' '}
          <Link onClick={() => navigate(-1)} to={'#'}>
            Back
          </Link>
        </Heading>
      </div>
    </div>
  );
}

export default ErrorPage;
