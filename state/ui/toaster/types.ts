export type OpenToasterDispatchPayload = Omit<UseToasterState, 'isOpen'>;

export type UseToasterState = {
  isOpen: boolean;
  body: string;
  variant?: ToasterVariant | null;
  transitionDirection?: TransitionDirection;
  onClose?: () => void;
};

export interface UseToasterDispatch {
  openToaster: (payload: OpenToasterDispatchPayload) => void;
  closeToaster: () => void;
}

export type UseToaster = [UseToasterState, UseToasterDispatch];

export enum ToasterVariant {
  SUCCESS,
}

export enum TransitionDirection {
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
  DOWN = 'DOWN',
  UP = 'UP',
}
