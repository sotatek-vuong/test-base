import { ERC20Token } from '@/utils/types';
import React, { useState, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import { TokenDialog, TokenDialogProps } from './TokenDialog';

export type TokenDialogRefProps =
  | {
      userSelectToken: () => Promise<ERC20Token | null>;
    }
  | undefined;

export type TokenDialogPromptProps = Omit<TokenDialogProps, 'open' | 'onClose'>;

export const TokenDialogPrompt = forwardRef<TokenDialogRefProps, TokenDialogPromptProps>(
  (props, ref) => {
    const [open, setOpen] = useState(false);

    const promiseRef = useRef<{ resolve: (value: ERC20Token | null) => void } | null>(null);

    const prompt = useCallback(() => {
      setOpen(true);
      return new Promise<ERC20Token | null>((resolve) => {
        promiseRef.current = { resolve };
      });
    }, []);

    useImperativeHandle(ref, () => ({ userSelectToken: prompt }), [prompt]);

    const handleClose = useCallback(() => {
      setOpen(false);
      promiseRef.current = null;
    }, [promiseRef.current]);

    const handleResolve = useCallback(
      (next: ERC20Token) => {
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
      <TokenDialog {...props} open={open} onClose={handleReject} onChangeToken={handleResolve} />
    );
  },
);

TokenDialogPrompt.displayName = 'TokenDialogPrompt';
