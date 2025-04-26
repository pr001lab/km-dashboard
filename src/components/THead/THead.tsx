import styles from './THead.module.scss';
import { THeadProps } from './THead.props';
import { SortEnum, tableColumns } from '../../constant';
import ButtonSortIcon from '../common/ButtonSortIcon/ButtonSortIcon';
import { getTextTransformCapitalize } from '../../utils/utils';
import Wrapper from '../common/Wrapper/Wrapper';
import { useEffect, useState } from 'react';

function THead({ sortName, sortOrder, setColSort }: THeadProps) {
  const [sort, setSort] = useState(sortName);

  useEffect(() => {
    setSort(sortName);
  }, [sortName]);

  if (setColSort !== undefined && sort !== undefined) {
    return (
      <thead>
        <tr className={styles['table__thead--mobile']}>
          <th>
            <div className={styles['custom-select']}>
              <select
                className={styles['table-header']}
                onChange={(evt) => setSort(evt.target.value)}
                value={sort}
              >
                {tableColumns.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            <ButtonSortIcon
              className={styles['table-header']}
              onClick={() => setColSort(sort)}
              sortOrder={sortName === sort ? sortOrder : SortEnum.None}
            >
              SortOrder
            </ButtonSortIcon>
          </th>
        </tr>
        <tr className={styles['table__thead']}>
          <th></th>
          {tableColumns.map((item) => (
            <th key={item}>
              <ButtonSortIcon
                className={styles['table-header']}
                onClick={() => setColSort(item)}
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
      <tr className={styles['table__thead']}>
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
