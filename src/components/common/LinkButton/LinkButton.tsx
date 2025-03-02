import styles from './LinkButton.module.scss';
import { LinkButtonProps } from './LinkButton.props';
import cn from 'classnames';
import { Link } from 'react-router-dom';

function LinkButton({ to, children, className = '' }: LinkButtonProps) {
  const cl = cn(styles['link-button'], styles[className]);

  return (
    <Link to={to} className={cl}>
      {children}
    </Link>
  );
}

export default LinkButton;
