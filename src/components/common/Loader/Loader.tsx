import styles from './Loader.module.scss';

function Loader() {
  return (
    <div className={styles['loading-container']}>
      <div className={styles['loading-spinner']}></div>
    </div>
  );
}

export default Loader;
