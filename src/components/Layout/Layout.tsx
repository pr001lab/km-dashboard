import Main from '../common/Main/Main';
import styles from './Layout.module.scss';

function Layout({ children }: { children: React.ReactNode }) {
  return <Main className={styles['layout']}>{children}</Main>;
}

export default Layout;
