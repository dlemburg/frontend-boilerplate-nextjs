import React, { useState, useCallback, useMemo } from 'react';
import { isString, chunk } from 'lodash';
import { Theme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Box from '@mui/material/Box';
import SortIcon from './TableSortIcon';
import TableCellHead from './TableCellHead';
import TableDataRow from './TableRow';
import Pagination from '@mui/material/Pagination';
import { TableProps, TableSortOrder, TableSortDir } from './types';
import { checkItemAgainstFilter, sortByKey } from './util';
import useClasses from '../../../state/common/hooks/use-classes';

const styles = (theme: Theme) => {
  return {
    iconColor: () => ({
      color: theme.palette.secondary.main,
    }),
    headCell: {
      width: '200px',
      paddingLeft: 0,
      paddingRight: 0,
      borderBottom: 'none',
      userSelect: 'none',
      cursor: 'pointer',
    },
    checkboxCell: () => ({
      width: '0.2rem',
      padding: 0,
      paddingLeft: theme.spacing(1),
    }),
    firstCell: () => ({
      paddingRight: 0,
      paddingLeft: theme.spacing(1.5),
    }),
    body: () => ({
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 1px rgba(0,0,0,0.14), 0px 1px 3px 1px rgba(0,0,0,0.12)',
      borderRadius: theme.shape.borderRadius,
    }),
    iconCell: {
      width: '65px',
    },
    table: () => ({
      margin: `0 auto ${theme.spacing(5)}px`,
    }),
  };
};

const DEFAULT_CLASSES_FNS = {
  componentContainer: () => '',
  tableContainer: () => '',
  table: () => '',
  tableHeadContainer: () => '',
  tableHead: () => '',
  row: () => '',
  body: () => '',
  headRow: () => '',
  sortIconColor: () => '',
};
const ITEMS_PER_PAGE = 12;

type TableDataProps = {
  id?: number;
  className?: string;
  label?: string;
} & object;

const Table = <T extends TableDataProps>({
  columns,
  data,
  options,
  checkboxMap,
  filters = [],
  classes: propClasses = DEFAULT_CLASSES_FNS,
  rowProps,
  cellProps,
  onCheckboxChange,
  onRowClick,
}: TableProps<T>): React.ReactElement => {
  const classes = useClasses(styles);
  const [sort, setSort] = useState<TableSortOrder>({
    direction: TableSortDir.ASC,
    sortKey: columns[0].options?.sortKey || null,
  });
  const [page, setPage] = useState<number>(1);

  const handleSort = useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      const { sortKey: activeSortKey, direction } = sort;
      if (event.currentTarget) {
        setSort({
          direction:
            event.currentTarget.id === activeSortKey && direction === TableSortDir.ASC
              ? TableSortDir.DESC
              : TableSortDir.ASC,
          sortKey: event.currentTarget.id,
        });
      }
    },
    [setSort, sort]
  );

  const handleChangePage = (_, next: number) => setPage(next);

  const handleRowClick =
    (item: T, idx: number) => (event?: React.MouseEvent<HTMLDivElement | HTMLTableRowElement | Element>) => {
      if (event) event.stopPropagation();

      if (onRowClick) {
        onRowClick(item, idx);
      }
    };

  const applyFilters = useCallback(
    (l: T[]): T[] => l.filter((item: T) => checkItemAgainstFilter(item, filters)),
    [filters]
  );
  const applySort = useCallback(
    (l: T[]): T[] => [...l].sort((a, b) => sortByKey(sort.direction, sort.sortKey, a, b)),
    [sort]
  );
  const applyPagination = useCallback(
    (l: T[]): T[][] => chunk(l, options?.itemsPerPage ?? ITEMS_PER_PAGE),
    [options?.itemsPerPage]
  );

  const computedList: T[] | T[][] = useMemo(() => {
    let computed: T[] | T[][] = data;

    if (options?.filtered) {
      computed = applyFilters(computed) as T[];
    }

    if (options?.sortable) {
      computed = applySort(computed) as T[];
    }

    if (options?.paginated) {
      computed = applyPagination(computed) as T[][];
    }

    return computed;
  }, [data, applyFilters, applySort, applyPagination, options]);

  const displayedList = useMemo(() => {
    if (options?.paginated && computedList.length) return computedList[page - 1] as T[];

    return computedList as T[];
  }, [options, computedList, page]);

  const renderTableBody = () => {
    return displayedList.map((item, idx) => {
      return (
        <TableDataRow
          id={item.id ? String(item.id) : `${idx}`}
          key={`table-row${idx}`}
          label={`${item?.label ?? String(idx + 1)} Row`}
          readOnly={options?.readOnly || false}
          enableCheck={options?.checkbox || false}
          noCellBorder={idx === displayedList.length - 1}
          checked={checkboxMap && item.id ? checkboxMap[item.id] : false}
          rowData={item}
          rowDataIndex={idx}
          handleCheck={onCheckboxChange}
          handleRowClick={handleRowClick(item, idx)}
          className={`${propClasses?.row?.(item, idx) ?? ''} ${item.className ?? ''}`}
          columns={columns}
          rowProps={rowProps}
          groupIndexes={options?.groupIndexes ?? []}
        />
      );
    });
  };

  return (
    <div className={propClasses?.componentContainer?.() ?? ''}>
      <MuiTable className={propClasses?.tableHeadContainer?.() ?? ''}>
        <TableHead className={propClasses?.tableHead?.() ?? ''}>
          <TableRow>
            {options?.checkbox && <TableCell className={`${classes.headCell} ${classes.checkboxCell}`} />}
            {columns.map(({ label, options, ...col }, idx) => {
              const labelKey = isString(label) ? label : (label as any)?.key; // TODO: key?
              const sortProps = {
                innerContainerProps: { id: options?.sortKey || labelKey },
                onClick: handleSort,
                SortIcon: (
                  <SortIcon
                    className={`${classes.iconColor} ${propClasses?.sortIconColor?.() ?? ''}`}
                    direction={sort.sortKey === options?.sortKey ? sort.direction : TableSortDir.ASC}
                  />
                ),
              };
              return (
                <TableCellHead
                  key={`${labelKey}-${idx}-table-header`}
                  style={{ ...(options?.width && { width: options?.width }) }}
                  className={`${classes.headCell} ${classes.firstCell}`}
                  typographyProps={{
                    className: propClasses?.headRow?.({ ...col, label, options }, idx) ?? '',
                  }}
                  {...(options?.sortable && sortProps)}
                  {...cellProps?.({ ...col, options, label }, idx)}
                >
                  {label}
                </TableCellHead>
              );
            })}
          </TableRow>
        </TableHead>
      </MuiTable>
      <TableContainer className={propClasses?.tableContainer?.() ?? ''} component={Paper}>
        <MuiTable className={propClasses?.table?.() ?? ''}>
          <TableBody className={`${classes.body} ${propClasses?.body?.() ?? ''}`}>{renderTableBody()}</TableBody>
        </MuiTable>
      </TableContainer>
      {options?.paginated && (
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Pagination color="primary" count={computedList.length} page={page} onChange={handleChangePage} />
        </Box>
      )}
    </div>
  );
};

export default Table;
