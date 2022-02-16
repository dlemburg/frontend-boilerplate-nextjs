import React from 'react';
import cx from 'clsx';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { SvgIconProps } from '@mui/material/SvgIcon';
import useClasses from '../../../state/ui/modal/hooks/use-classes';

interface ClassroomSelectSortIconProps extends SvgIconProps {
  direction?: 'ASC' | 'DESC';
}

const styles = () => {
  return {
    root: {
      width: '20px',
      height: '20px',
    },
  };
};

const ClassroomSelectSortIcon: React.FC<ClassroomSelectSortIconProps> = ({ direction = 'ASC', className, ...rest }) => {
  const { root } = useClasses(styles);

  return direction === 'ASC' ? (
    <ArrowDropDownIcon className={cx(root, className)} {...rest} />
  ) : (
    <ArrowDropUpIcon className={cx(root, className)} {...rest} />
  );
};

export default ClassroomSelectSortIcon;
