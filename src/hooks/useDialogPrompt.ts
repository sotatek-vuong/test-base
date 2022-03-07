import { useState, useRef, useCallback, useImperativeHandle } from 'react';

export type PromptFn<T, Args = unknown> =
  | {
      prompt: (args?: Args) => Promise<T | undefined>;
    }
  | undefined;

export function useDialogPrompt<T, Args = unknown>(ref: React.ForwardedRef<PromptFn<T, Args>>) {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState<Args>();

  const promiseRef = useRef<{ resolve: (value: T | undefined) => void } | undefined>();

  const prompt = useCallback((args?: Args) => {
    setParams(args);
    setOpen(true);
    return new Promise<T | undefined>((resolve) => {
      promiseRef.current = { resolve };
    });
  }, []);

  useImperativeHandle(ref, () => ({ prompt }), [prompt]);

  const handleClose = useCallback(() => {
    setOpen(false);
    promiseRef.current = undefined;
  }, []);

  const handleResolve = useCallback(
    (next: T) => {
      promiseRef.current?.resolve(next);
      handleClose();
    },
    [handleClose],
  );

  const handleReject = useCallback(() => {
    setParams(undefined);
    promiseRef.current?.resolve(undefined);
    handleClose();
  }, [handleClose]);

  return { params, open, handleReject, handleResolve };
}
