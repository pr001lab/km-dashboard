import styles from './THead.module.scss';
import { THeadProps } from './THead.props';
import { SortEnum, tableColumns } from '../../constant';
import ButtonSortIcon from '../common/ButtonSortIcon/ButtonSortIcon';
import { getTextTransformCapitalize } from '../../utils';
import Wrapper from '../common/Wrapper/Wrapper';

function THead({ sortName, sortOrder, setSort }: THeadProps) {
  if (setSort !== undefined) {
    return (
      <thead>
        <tr>
          <th></th>
          {tableColumns.map((item) => (
            <th key={item}>
              <ButtonSortIcon
                className={styles['table-header']}
                onClick={() => setSort(item)}
                sortOrder={sortName === item ? sortOrder : SortEnum.None}
              >
                {getTextTransformCapitalize(item)}
              </ButtonSortIcon>
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
    );
  }

  return (
    <thead>
      <tr>
        <th></th>
        {tableColumns.map((item) => (
          <th key={item}>
            <Wrapper className={styles['table-header']}>
              {getTextTransformCapitalize(item)}
            </Wrapper>
          </th>
        ))}
        <th></th>
      </tr>
    </thead>
  );
}

export default THead;
