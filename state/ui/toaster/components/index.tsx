import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { TransitionDirection, UseToasterState } from '../types';

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

const getTransition = (dir) => {
  switch (dir) {
    case TransitionDirection.DOWN:
      return TransitionDown;
    case TransitionDirection.UP:
      return TransitionUp;
    case TransitionDirection.RIGHT:
      return TransitionRight;
    case TransitionDirection.LEFT:
      return TransitionLeft;
    default:
      return TransitionLeft;
  }
};

const POSITION = {
  vertical: 'top',
  horizontal: 'right',
};

const Toaster = (props: UseToasterState) => {
  const TransitionComponent = getTransition(props.transitionDirection);

  return (
    <div>
      <Snackbar
        anchorOrigin={POSITION as any}
        open={props.isOpen}
        onClose={props.onClose}
        message={props.body}
        TransitionComponent={TransitionComponent}
        key={TransitionComponent ? TransitionComponent.name : ''}
      />
    </div>
  );
};

export default Toaster;
