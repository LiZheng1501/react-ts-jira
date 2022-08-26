import { useState, useCallback } from 'react';
export const useUndo = <T>(initialPresent: T) => {
  // 集合状态
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });
  const canUndo = state.past.length !== 0; // 如果有历史记录就可以回退
  const canRedo = state.future.length !== 0; // 如果有future的话就可以再做一遍
  const undo = useCallback(() => {
    setState((prevState) => {
      const { past, present, future } = prevState;
      if (past.length === 0) return prevState;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);
  const redo = useCallback(() => {
    setState((prevState) => {
      const { past, present, future } = prevState;
      if (future.length === 0) return prevState;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState((prevState) => {
      const { present, future, past } = prevState;
      if (newPresent === present) {
        // 传进来的值和新的是一样的
        return prevState;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState((prevState) => {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  return [state, { set, reset, redo, undo, canUndo, canRedo }];
};
