import React, { useState, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import { NetworkDialog, NetworkDialogProps } from './NetworkDialog';

export type NetworkDialogRefProps =
  | {
      userSelectNetwork: () => Promise<number | null>;
    }
  | undefined;

export type PromptNetworkDialogProps = Omit<NetworkDialogProps, 'open' | 'onClose'>;

export const PromptNetworkDialog = forwardRef<NetworkDialogRefProps, PromptNetworkDialogProps>(
  (props, ref) => {
    const [open, setOpen] = useState(false);

    const promiseRef = useRef<{ resolve: (value: number | null) => void } | null>(null);

    const prompt = useCallback(() => {
      setOpen(true);
      return new Promise<number | null>((resolve) => {
        promiseRef.current = { resolve };
      });
    }, []);

    useImperativeHandle(ref, () => ({ userSelectNetwork: prompt }), [prompt]);

    const handleClose = useCallback(() => {
      setOpen(false);
      promiseRef.current = null;
    }, [promiseRef.current]);

    const handleResolve = useCallback(
      (next: number) => {
        promiseRef.current?.resolve(next);
        handleClose();
      },
      [handleClose],
    );

    const handleReject = useCallback(() => {
      promiseRef.current?.resolve(null);
      handleClose();
    }, [handleClose]);

    return (
      <NetworkDialog
        {...props}
        open={open}
        onClose={handleReject}
        onChangeNetwork={handleResolve}
      />
    );
  },
);

PromptNetworkDialog.displayName = 'PromptNetworkDialog';
