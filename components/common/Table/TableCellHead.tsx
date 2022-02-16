import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import useClasses from '../../../state/common/hooks/use-classes';

const styles = () => {
  return {
    typographyContent: {
      fontSize: '0.70rem',
      height: '23px',
      fontWeight: 900,
      color: '#4A4A4A',
      lineHeight: '23px',
    },
    iconSize: {
      width: '10px',
    },
    contentContainer: {
      display: 'inline-flex',
      marginRight: '0',
    },
    iconContainer: {
      height: '10px',
      width: '5px',
    },
  };
};

interface TableHeadCellProps extends TableCellProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  SortIcon?: React.ReactNode;
  typographyProps?: Omit<TypographyProps, 'children'>;
  innerContainerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  iconContainerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
}
const TableHeadCell: React.FC<TableHeadCellProps> = ({
  children,
  onClick,
  SortIcon,
  typographyProps = {},
  innerContainerProps = {},
  iconContainerProps = {},
  ...rest
}) => {
  const classes = useClasses(styles);
  return (
    <TableCell role="columnheader" {...rest}>
      <div onClick={onClick} className={classes.contentContainer} {...innerContainerProps}>
        {typeof children === 'string' ? (
          <Typography component={'span'} className={`${classes.typographyContent} ${typographyProps.className}`}>
            {children}
          </Typography>
        ) : (
          children
        )}
        {SortIcon && (
          <span className={classes.iconContainer} {...iconContainerProps}>
            {SortIcon}
          </span>
        )}
      </div>
    </TableCell>
  );
};

export default TableHeadCell;
