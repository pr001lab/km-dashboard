import styles from './Main.module.scss';
import { MainProps } from './Main.props';
import cn from 'classnames';

function Main({ children, className, ...props }: MainProps) {
  const cl = cn(styles['main'], className);

  return (
    <main {...props} className={cl}>
      {children}
    </main>
  );
}

export default Main;
