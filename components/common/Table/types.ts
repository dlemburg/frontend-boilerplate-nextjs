import { TableRowProps as MuiTableRowProps } from '@mui/material/TableRow';
import { TableCellProps as MuiTableCellProps } from '@mui/material/TableCell';

export interface TableFilter {
  path: string;
  compareTo: any; // TODO: need to look at implementation
}

export type TableSortOrder = {
  direction: TableSortDir;
  sortKey: string | null;
};

export enum TableSortDir {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type TableColumnOptions = {
  width?: string;
  sortable?: boolean;
  sortKey?: string;
  className?: string;
};

export interface TableColumnProps<T> {
  label: string | React.ReactElement;
  getValue: (item: T, idx: number) => string | React.ReactElement;
  options?: TableColumnOptions;
}

export type TableOptions<T> = {
  checkbox?: boolean;
  sortable?: boolean;
  readOnly?: boolean;
  paginated?: boolean;
  filtered?: boolean;
  itemsPerPage?: number;
  groupIndexes?: number[];
};

export type TableCssClassesFns<T> = {
  componentContainer?: () => string;
  tableContainer?: () => string;
  table?: () => string;
  tableHeadContainer?: () => string;
  tableHead?: () => string;
  row?: (item: T, idx: number) => string;
  body?: () => string;
  headRow?: (column: TableColumnProps<T>, idx: number) => string;
  sortIconColor?: () => string;
};

export type TableCheckboxMap = { [key: string]: boolean };
export interface TableProps<T> {
  data: T[];
  columns: TableColumnProps<T>[];
  filters?: TableFilter[];
  checkboxMap?: TableCheckboxMap;
  options?: TableOptions<T>;
  classes?: TableCssClassesFns<T>;
  onCheckboxChange?: React.ChangeEventHandler<HTMLInputElement>;
  onRowClick?: (rowItem: T, idx?: number) => () => void;
  rowProps?: (item: T, idx: number) => MuiTableRowProps;
  cellProps?: (col: TableColumnProps<T>, idx: number) => MuiTableCellProps;
}

export interface TableRowProps<T> extends Omit<MuiTableRowProps, 'children'> {
  rowData: T;
  noCellBorder?: boolean;
  handleCheck?: React.ChangeEventHandler<HTMLInputElement>;
  handleRowClick?: any; // Todo () => void
  enableCheck?: boolean;
  checked?: boolean;
  readOnly?: boolean;
  label?: string;
  id?: string;
  className?: string;
  columns: TableColumnProps<T>[];
  style?: any;
  rowDataIndex: number;
  rowProps?: (item: T, idx: number) => MuiTableRowProps;
  cellProps?: (col: TableColumnProps<T>, idx: number) => MuiTableCellProps;
  groupIndexes?: number[];
}
