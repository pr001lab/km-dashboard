import styles from './Section.module.css';
import { SectionProps } from './Section.props';
import cn from 'classnames';

function Section({ children, className, ...props }: SectionProps) {
  const cl = cn(styles['section'], className);

  return (
    <section {...props} className={cl}>
      {children}
    </section>
  );
}

export default Section;
