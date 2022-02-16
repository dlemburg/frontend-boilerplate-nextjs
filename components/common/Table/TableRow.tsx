import React, { FC } from 'react';
import { Theme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { TableRowProps } from './types';
import useClasses from '../../../state/common/hooks/use-classes';

const DEFAULT_GROUP_STYLE = {
  borderTopStyle: 'solid',
  borderTopColor: '#DBDBDB',
  padding: '0 14px',
};

const styles = (theme: Theme) => {
  return {
    checkboxCell: () => ({
      width: '0.2rem',
      padding: 0,
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(0.5),
    }),
    checkBox: () => ({
      width: '14px',
      height: '14px',
      borderRadius: '1px',
      fontSize: '0.5rem',
      padding: 0,
      boxShadow: `0 0 0 1px ${theme.palette.secondary.main}`,
      color: 'transparent',
    }),
    cell: {
      width: '200px',
      paddingLeft: 0,
      paddingRight: 0,
      fontSize: '0.9rem',
    },
    firstCell: () => ({
      width: '200px',
      fontSize: '0.95rem',
      fontWeight: 600,
      paddingRight: 0,
      paddingLeft: theme.spacing(1.5),
    }),
    thumbnail: {
      maxHeight: '26px',
      maxWidth: '26px',
    },
    padIcon: () => ({
      paddingRight: theme.spacing(0.75),
    }),
    noBorder: {
      border: 'none',
    },
    icons: {
      width: '75px',
    },
    input: {
      height: '15px',
      width: '15px',
    },
    gray: () => ({
      backgroundColor: theme.palette.grey[200],
    }),
    disabled: () => ({
      color: theme.palette.secondary.main,
    }),
  };
};

const CommonTableRow: FC<TableRowProps<any>> = ({
  id,
  label,
  readOnly,
  noCellBorder,
  enableCheck,
  checked,
  rowData,
  rowDataIndex,
  handleCheck,
  handleRowClick,
  className,
  columns,
  rowProps,
  cellProps,
  groupIndexes = [],
}) => {
  const classes = useClasses(styles);
  const borderless = { [classes.noBorder]: noCellBorder };
  const gray = { [classes.gray]: checked };

  return (
    <>
      <TableRow
        className={`${classes.noBorder} ${className}`}
        onClick={handleRowClick}
        {...rowProps?.(rowData, rowDataIndex)}
        style={groupIndexes.includes(rowDataIndex) ? DEFAULT_GROUP_STYLE : ({} as any)}
      >
        {enableCheck && (
          <TableCell className={`${classes.checkboxCell} ${borderless} ${gray}`}>
            <Checkbox
              value={id}
              disabled={readOnly}
              aria-label={`${label} Checkbox`}
              aria-checked={checked}
              aria-disabled={readOnly}
              checked={checked}
              onChange={handleCheck}
              classes={{
                disabled: classes.disabled,
              }}
              className={classes.checkBox}
              size="small"
              color="secondary"
            />
          </TableCell>
        )}
        {columns.map((col, idx) => {
          return (
            <TableCell
              style={{ ...(col.options?.width && { width: col.options?.width }) }}
              key={`${col.label}_${idx}-table-row-data`}
              className={`${classes.firstCell} ${borderless} ${gray}`}
              {...cellProps?.(col, idx)}
            >
              {col.getValue(rowData, idx)}
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
};

export default CommonTableRow;
