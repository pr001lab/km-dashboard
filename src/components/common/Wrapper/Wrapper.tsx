import styles from './Wrapper.module.scss';
import { WrapperProps } from './Wrapper.props';
import cn from 'classnames';

function Wrapper({ children, className, ...props }: WrapperProps) {
  const cl = cn(styles['wrapper'], className);

  return (
    <div {...props} className={cl}>
      {children}
    </div>
  );
}

export default Wrapper;
