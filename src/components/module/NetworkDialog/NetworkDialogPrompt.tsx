import { useDialogPrompt, PromptFn } from '@/hooks/index';
import React, { forwardRef } from 'react';
import { NetworkDialog, NetworkDialogProps } from './NetworkDialog';

export type PromptNetworkDialogProps = Omit<NetworkDialogProps, 'open' | 'onClose'>;

export type NetworkPromptFn = PromptFn<number>;

export const PromptNetworkDialog = forwardRef<NetworkPromptFn, PromptNetworkDialogProps>(
  (props, ref) => {
    const { open, handleResolve, handleReject } = useDialogPrompt(ref);

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
