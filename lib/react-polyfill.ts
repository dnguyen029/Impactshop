/* eslint-disable */
import * as React from 'react';

if (typeof window !== 'undefined' && !(React as any).useEffectEvent) {
  (React as any).useEffectEvent = (fn: (...args: unknown[]) => unknown) => {
    const ref = React.useRef(fn);
    React.useInsertionEffect(() => {
      ref.current = fn;
    });
    return React.useCallback((...args: unknown[]) => {
      return ref.current?.(...args);
    }, []);
  };
}
