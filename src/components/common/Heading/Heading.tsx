import styles from './Heading.module.scss';
import { HeadingProps } from './Heading.props';
import cn from 'classnames';

function Heading({
  children,
  className = '',
  level = 'h1',
  ...props
}: HeadingProps) {
  const cl = cn(styles['heading'], className);

  const Tag = level;

  return (
    <Tag {...props} className={cl}>
      {children}
    </Tag>
  );
}

export default Heading;
