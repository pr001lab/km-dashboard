import styles from './TBody.module.scss';
import { TBodyProps } from './TBody.props';
import { AppRoute, Type } from '../../constant';
import { getTextTransformCapitalize } from '../../utils';
import LinkButton from '../common/LinkButton/LinkButton';

function TBody({ tests, className, ...props }: TBodyProps) {
  return (
    <tbody>
      {tests.map((test) => {
        const { id, name, type, status, siteId, site } = test;
        const indicatorColor = `siteId-${siteId}`;
        const typeTransform = [Type.MVT].includes(type)
          ? type
          : getTextTransformCapitalize(type).replace(/[_]/g, '-');
        const linkTo =
          status === 'DRAFT'
            ? `${AppRoute.FinalizeTestId}/${id}`
            : `${AppRoute.ResultsTestId}/${id}`;

        return (
          <tr className={styles['row-table']} key={id}>
            <td
              className={`${styles['row-indicator']} ${styles[indicatorColor]}`}
            ></td>
            <td className={styles['row-name']}>{name}</td>
            <td className={styles['row-type']}>{typeTransform}</td>
            <td className={`${styles['row-status']} ${styles[status]}`}>
              {getTextTransformCapitalize(status)}
            </td>
            <td className={styles['row-site']}>{site}</td>
            <td>
              <LinkButton
                to={linkTo}
                className={status === 'DRAFT' ? 'gray-dark' : ''}
              >
                {status === 'DRAFT' ? 'Finalize' : 'Results'}
              </LinkButton>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default TBody;
