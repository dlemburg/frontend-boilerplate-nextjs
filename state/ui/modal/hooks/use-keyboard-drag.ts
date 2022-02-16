import { useCallback, useEffect, useState } from 'react';

type KeyboardDragPosition = {
  enabled: boolean;
  x: number;
  y: number;
};

type KeyboardDragSetEnable = React.Dispatch<React.SetStateAction<boolean>>;

enum ArrowKeys {
  left = 'ArrowLeft',
  up = 'ArrowUp',
  right = 'ArrowRight',
  down = 'ArrowDown'
}

const useKeyboardDrag = (): [KeyboardDragPosition, KeyboardDragSetEnable] => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) setEnabled(true);
      switch (e.key) {
        case ArrowKeys.left:
          if (pos.x > -400) {
            setPos({ ...pos, x: pos.x -= 5 });
          }
          break;
        case ArrowKeys.right:
          if (pos.x < 400) {
            setPos({ ...pos, x: pos.x += 5 });
          }
          break;
        case ArrowKeys.up:
          if (pos.y > -400) {
            setPos({ ...pos, y: pos.y -= 5 });
          }
          break;
        case ArrowKeys.down:
          if (pos.y < 400) {
            setPos({ ...pos, y: pos.y += 5 });
          }
          break;
        default:
          setEnabled(false);
      }
    },
    [setPos, setEnabled]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    document.removeEventListener('click', () => setEnabled(false));
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      setEnabled(false);
    };
  }, []);

  return [{ enabled, x: pos.x, y: pos.y }, setEnabled];
};

export default useKeyboardDrag;
