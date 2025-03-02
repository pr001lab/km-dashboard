import styles from './ButtonSortIcon.module.scss';
import { ButtonSortIconProps } from './ButtonSortIcon.props';
import cn from 'classnames';
import { ReactComponent as ChevronSM } from '../../../assets/icons/Chevron-sm.svg';
import Button from '../Button/Button';
import { SortEnum } from '../../../constant';

function ButtonSortIcon({
  children,
  sortOrder = SortEnum.None,
  onClick,
  className,
}: ButtonSortIconProps) {
  const cl = cn(styles['button'], className, styles[sortOrder]);

  return (
    <Button className={cl} onClick={onClick}>
      {children}
      <ChevronSM />
    </Button>
  );
}

export default ButtonSortIcon;
