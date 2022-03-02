import { useState, useRef, useCallback, useImperativeHandle } from 'react';

export type PromptFn<T> =
  | {
      prompt: () => Promise<T | undefined>;
    }
  | undefined;

export function useDialogPrompt<T>(ref: React.ForwardedRef<PromptFn<T>>) {
  const [open, setOpen] = useState(false);

  const promiseRef = useRef<{ resolve: (value: T | undefined) => void } | undefined>();

  const prompt = useCallback(() => {
    setOpen(true);
    return new Promise<T | undefined>((resolve) => {
      promiseRef.current = { resolve };
    });
  }, []);

  useImperativeHandle(ref, () => ({ prompt }), [prompt]);

  const handleClose = useCallback(() => {
    setOpen(false);
    promiseRef.current = undefined;
  }, [promiseRef.current]);

  const handleResolve = useCallback(
    (next: T) => {
      promiseRef.current?.resolve(next);
      handleClose();
    },
    [handleClose],
  );

  const handleReject = useCallback(() => {
    promiseRef.current?.resolve(undefined);
    handleClose();
  }, [handleClose]);

  return { open, handleReject, handleResolve };
}
