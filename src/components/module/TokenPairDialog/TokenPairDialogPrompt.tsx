import { PromptFn, useDialogPrompt } from '@/hooks';
import { TokenPair } from '@/utils';
import _ from 'lodash';
import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { TokenPairDialog, TokenPairDialogProps } from './TokenPairDialog';

export type TokenPairDialogPromptProps = Omit<TokenPairDialogProps, 'open' | 'onClose'>;

export type TokenPromptFn = PromptFn<TokenPair, Partial<{ from?: string; to?: string }>>;

export const TokenPairDialogPrompt = forwardRef<TokenPromptFn, TokenPairDialogPromptProps>(
  (props, ref) => {
    const { params, open, handleResolve, handleReject } = useDialogPrompt(ref);

    const { loading, pairs } = useSelector(({ meta: { tokenPairs } }) => ({
      loading: tokenPairs.loading,
      pairs: _.filter(tokenPairs.data, {
        from_chain: params?.from,
        to_chain: params?.to,
      }),
    }));

    return (
      <TokenPairDialog
        {...props}
        loading={loading}
        tokenPairs={pairs}
        open={open}
        onClose={handleReject}
        onChangeToken={handleResolve}
      />
    );
  },
);

TokenPairDialogPrompt.displayName = 'TokenPairDialogPrompt';
