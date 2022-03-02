import { PromptFn, useDialogPrompt } from '@/hooks/index';
import { ERC20Token } from '@/utils/types';
import React, { forwardRef } from 'react';
import { TokenDialog, TokenDialogProps } from './TokenDialog';

export type TokenDialogPromptProps = Omit<TokenDialogProps, 'open' | 'onClose'>;

export type TokenPromptFn = PromptFn<ERC20Token>;

export const TokenDialogPrompt = forwardRef<TokenPromptFn, TokenDialogPromptProps>((props, ref) => {
  const { open, handleResolve, handleReject } = useDialogPrompt(ref);

  return (
    <TokenDialog {...props} open={open} onClose={handleReject} onChangeToken={handleResolve} />
  );
});

TokenDialogPrompt.displayName = 'TokenDialogPrompt';
