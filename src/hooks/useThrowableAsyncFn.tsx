/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList, useCallback, useRef, useState } from 'react';
import useMountedState from 'react-use/lib/useMountedState';
export type PromiseType<P extends Promise<any>> = P extends Promise<infer T> ? T : never;

export type FunctionReturningPromise = (...args: any[]) => Promise<any>;

export type AsyncState<T> =
  | {
      loading: boolean;
      error?: undefined;
      value?: undefined;
    }
  | {
      loading: true;
      error?: Error | undefined;
      value?: T;
    }
  | {
      loading: false;
      error: Error;
      value?: undefined;
    }
  | {
      loading: false;
      error?: undefined;
      value: T;
    };

type StateFromFunctionReturningPromise<T extends FunctionReturningPromise> = AsyncState<
  PromiseType<ReturnType<T>>
>;

export type AsyncFnReturn<T extends FunctionReturningPromise = FunctionReturningPromise> = [
  StateFromFunctionReturningPromise<T>,
  T,
];

export default function useThrowableAsyncFn<T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = [],
  initialState: StateFromFunctionReturningPromise<T> = { loading: false },
  catchOnError = false,
): AsyncFnReturn<T> {
  const lastCallId = useRef(0);
  const isMounted = useMountedState();
  const [state, set] = useState<StateFromFunctionReturningPromise<T>>(initialState);

  const callback = useCallback(
    (...args: Parameters<T>): ReturnType<T> => {
      const callId = ++lastCallId.current;

      if (!state.loading) {
        set((prevState) => ({ ...prevState, loading: true }));
      }

      return fn(...args).then(
        (value) => {
          isMounted() && callId === lastCallId.current && set({ value, loading: false });

          return value;
        },
        (error) => {
          isMounted() && callId === lastCallId.current && set({ error, loading: false });

          if (catchOnError) {
            return error;
          }
          throw error;
        },
      ) as ReturnType<T>;
    },
    [...deps, catchOnError],
  );

  return [state, callback as unknown as T];
}
