import { useDialogPrompt, PromptFn } from '@/hooks';
import React, { forwardRef } from 'react';
import { NetworkDialog, NetworkDialogProps } from './NetworkDialog';

export type PromptNetworkDialogProps = Omit<NetworkDialogProps, 'open' | 'onClose'>;

export type NetworkPromptFn = PromptFn<string>;

export const PromptNetworkDialog = forwardRef<NetworkPromptFn, PromptNetworkDialogProps>(
  (props, ref) => {
    const { open, handleResolve, handleReject } = useDialogPrompt(ref);

    return (
      <NetworkDialog {...props} open={open} onClose={handleReject} onChangeChain={handleResolve} />
    );
  },
);

PromptNetworkDialog.displayName = 'PromptNetworkDialog';
