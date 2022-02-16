import { get, difference, isObject, isArray } from 'lodash';
import { TableFilter, TableSortOrder, TableSortDir } from './types';

export const checkItemAgainstFilter = (
  item: { [key: string]: any },
  filters: Array<TableFilter>
): boolean => {
  if (isObject(item) && filters.length) {
    const shouldNotBeIncluded = filters.some((filter: TableFilter) => {
      const { path, compareTo } = filter;
      const itemValue = get(item, path);

      if (isArray(itemValue)) {
        // check if the item value includes all of the items in the compareTo array/list
        // the position of the arguments for difference is important!
        const studentIds = itemValue.map((a: any) => a.id);
        return difference(compareTo, studentIds).length !== 0;
      } else {
        return itemValue !== compareTo;
      }
    });

    return !shouldNotBeIncluded;
  }

  return true;
};

export const sortByKey = (
  direction: TableSortOrder['direction'],
  sortKey: TableSortOrder['sortKey'],
  a: any,
  b: any
): number => {
  if (sortKey) {
    const sortOrderCoeff = direction === TableSortDir.ASC ? 1 : -1;
    const final = (statement: boolean) => (statement ? -1 * sortOrderCoeff : 1 * sortOrderCoeff);

    const keyA = a[sortKey];
    const keyB = b[sortKey];

    if (typeof keyA === 'string' && typeof keyB === 'string') {
      return final(keyA.toUpperCase() < keyB.toUpperCase());
    } else if (typeof keyA === 'number' && typeof keyB === 'number') {
      return final(keyA < keyB);
    } else {
      return 0;
    }
  }

  return 0;
};
