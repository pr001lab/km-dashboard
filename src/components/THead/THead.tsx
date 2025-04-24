import styles from './THead.module.scss';
import { THeadProps } from './THead.props';
import { SortEnum, tableColumns } from '../../constant';
import ButtonSortIcon from '../common/ButtonSortIcon/ButtonSortIcon';
import { getTextTransformCapitalize } from '../../utils/utils';
import Wrapper from '../common/Wrapper/Wrapper';
import { ChangeEvent, useState } from 'react';

function THead({ sortName, sortOrder, setColSort }: THeadProps) {
  const [sort, setSort] = useState('name');

  if (setColSort !== undefined) {
    const getSelectedValue = (evt: ChangeEvent<HTMLSelectElement>) => {
      setSort(evt.target.value);
    };

    return (
      <thead>
        <tr className={styles['table__thead--mobile']}>
          <th>
            <select onChange={getSelectedValue} value={sort}>
              <option>name</option>
              <option>type</option>
              <option>status</option>
              <option>site</option>
            </select>
          </th>
          <th>
            <ButtonSortIcon
              className={styles['table-header']}
              onClick={() => setColSort(sort)}
              sortOrder={sortName === sort ? sortOrder : SortEnum.None}
            >
              SortOrder
            </ButtonSortIcon>
          </th>
          <th></th>
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
