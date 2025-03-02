import styles from './Button.module.scss';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

function Button({ children, onClick, className, ...props }: ButtonProps) {
  const cl = cn(styles['button'], className);

  return (
    <button {...props} className={cl} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
