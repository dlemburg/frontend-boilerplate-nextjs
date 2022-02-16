import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Theme, makeStyles } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { ModalVariant, ModalComponentProps, ModalCloseMechanism } from '.';
import useClasses from './hooks/use-classes';

const styles = (theme: Theme) => {
  return {
    outerRoot: {
      display: 'flex',
      justifyContent: 'end',
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.7)',
      zIndex: theme.zIndex.modal,
      position: 'fixed',
      top: 0,
      left: 0,
    },
    innerRoot: {
      height: '100vh',
      borderRadius: 0,
      marginLeft: 'auto',
    },
    innerRootHalf: {
      width: 500,
    },
    innerRootFull: {
      width: '95%',
    },
    container: {
      height: '100%',
      marginTop: -48,
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      minHeight: 100,
      paddingLeft: theme.spacing(6),
    },
  };
};

export const SlideModal: React.FC<ModalComponentProps> = ({
  open,
  variant,
  onClose,
  getPaperStyles,
  Title,
  CloseButton,
  children,
}) => {
  const classes = useClasses(styles);
  const paperStyles = getPaperStyles?.({});

  const isHalfModal = useMemo(() => variant === ModalVariant.HALF_SLIDE, [variant]);

  const modal = useRef<HTMLDivElement | null>(null);
  const modalParent = useRef<HTMLDivElement | null>(null);
  const [tabList, setTabList] = useState<any>(null);

  const handleOnClickClose = (e) => {
    onClose(e, ModalCloseMechanism.ICON_CLICK);
  };

  // This useEffect is required to run on every re-render of the component,
  // otherwise focus will not work properly.
  useEffect(() => {
    if (modal && modal.current) modal.current.focus();
  });

  useEffect(() => {
    if (modalParent.current) {
      // Gets all of the elements with tabindex set to keep track of all tabblable elements.
      // Sets it to state while casting to an Array instead of NodeList.
      setTabList(Array.prototype.slice.call(modalParent.current.querySelectorAll('[tabindex]')));
    }
  }, [modalParent]);

  useEffect(() => {
    const keyboardCallback = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose(event, ModalCloseMechanism.ESCAPE_KEY_DOWN);
      if (event.key !== 'Tab' || !tabList || !tabList.length) return;
      // Using a for-loop here to be able to break out of the loop.
      for (const [index, node] of tabList.entries()) {
        if (node.isSameNode(event.target as Node)) {
          if (!tabList[index + 1] && modal.current) {
            event.preventDefault();
            modal.current.focus();
            break;
          }
        }
      }
    };

    document.addEventListener('keydown', keyboardCallback);
    return (): void => {
      document.removeEventListener('keydown', keyboardCallback);
    };
  }, [tabList, onClose]);

  return (
    <Fade in={open} timeout={150}>
      <div className={classes.outerRoot}>
        <Slide direction="left" in={open} timeout={300} ref={modalParent}>
          {open ? (
            <Paper
              className={`${classes.innerRoot} ${isHalfModal ? classes.innerRootHalf : classes.innerRootFull}`}
              style={paperStyles}
              ref={modal}
            >
              {CloseButton && <CloseButton onClick={handleOnClickClose} tabIndex={0} />}
              <div className={classes.container}>
                {Title && (
                  <div className={classes.header}>
                    <Typography variant="h2" component="h1">
                      {Title}
                    </Typography>
                  </div>
                )}
                {children}
              </div>
            </Paper>
          ) : (
            <></>
          )}
        </Slide>
      </div>
    </Fade>
  );
};

export default SlideModal;
