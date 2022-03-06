import type { NextPage } from 'next';
import { ConfirmDialog, ConfirmPromptFn, getIndexLayout, Link, RHFAppInput } from '@/components';
import { useForm } from 'react-hook-form';
import React, { useEffect, useMemo, useRef } from 'react';
import { QueryMapping, useAppWeb3, useBridge } from '@/hooks';
import { BridgeFormInterface, isClient } from '@/utils';
import { findChainAsset } from '@/web3';
import { RHFAddressInput, RHFChain, RHFAsset } from '@/components';
import { Zap, Alert as AlertIcon, Swap } from '@/icons';
import {
  Container,
  Stack,
  Paper,
  Alert,
  Button,
  AlertTitle,
  Typography,
  IconButton,
  InputAdornment,
  Portal,
  useMediaQuery,
} from '@mui/material';
import { BigNumber } from 'bignumber.js';

const getDefaultChain = (chainName?: string) => {
  if (chainName === 'celo') {
    return { from: 'celo', to: 'bsc' };
  }
  return { from: 'bsc', to: 'celo' };
};

const Home: NextPage = () => {
  const { account, chainName } = useAppWeb3();

  const { control, handleSubmit, getValues, setValue, watch } = useForm<BridgeFormInterface>({
    defaultValues: {
      ...getDefaultChain(chainName),
      dest: account,
      amount: '',
      pair: null,
    },
    mode: 'all',
  });

  useEffect(() => {
    if (account) {
      setValue('dest', account, { shouldDirty: true, shouldTouch: true });
    }
  }, [account]);

  useEffect(() => {
    if (chainName) {
      const { from, to } = getDefaultChain(chainName);
      setValue('from', from);
      setValue('to', to);
    }
  }, [chainName]);

  const confirmRef = useRef<ConfirmPromptFn>();

  const mobile = useMediaQuery(QueryMapping.mobile);

  const chainAssets = useMemo(() => findChainAsset(chainName), [chainName]);
  const [from, to, pair] = watch(['from', 'to', 'pair']);

  const spender = chainAssets?.bridge;

  const { balance, doApprove, isApproved, loading } = useBridge(pair?.from_address, spender);

  const _balance = balance.toFixed(2);
  const matchChain = chainName === from;

  const onSubmit = handleSubmit(async (data) => {
    const _spender = chainAssets?.bridge;

    if (_spender && !isApproved) {
      await doApprove(_spender);
    }

    const confirmed = await confirmRef.current?.prompt(data);
  });

  return (
    <>
      <ConfirmDialog ref={confirmRef} />

      <Paper
        component={(props) => <Stack {...props} component="form" />}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
        spacing={3}
        sx={{ p: 5, [QueryMapping.mobile]: { p: 2 } }}>
        <Stack
          sx={{
            position: 'relative',
            flexDirection: 'row',
            [QueryMapping.mobile]: { flexDirection: 'column' },
            '& > *': { flex: 1 },
            '& > *:not(:last-child)': {
              mr: 2,
              [QueryMapping.mobile]: {
                mr: 0,
                mb: 1,
              },
            },
          }}>
          <RHFChain controller={{ control, name: 'from' }} label="From" />

          <IconButton
            color="secondary"
            onClick={() => {
              const [_from, _to] = getValues(['from', 'to']);
              setValue('from', _to);
              setValue('to', _from);
            }}
            disableRipple
            style={{ margin: 0 }}
            sx={{
              zIndex: 2,
              position: 'absolute',
              left: '50%',
              top: '50%',
              [QueryMapping.mobile]: {
                top: '58%',
                transform: 'translate(-50%, -50%) rotateZ(-90deg)',
              },
              transform: 'translate(-50%, -50%)',
            }}>
            <Swap />
          </IconButton>

          <RHFChain controller={{ control, name: 'to' }} label="To" />
        </Stack>

        <RHFAsset
          {...{ from, to }}
          sx={{ ...(matchChain && { order: -1, mt: '0px !important', mb: '24px !important' }) }}
          controller={{ control, name: 'pair' }}
        />

        <RHFAddressInput controller={{ control, name: 'dest' }} />

        {!matchChain && (
          <Alert icon={<AlertIcon />}>
            To protect your asset, from network must be current network of your wallet. switch to
            your Plastik Network or change the direction of your swap networks.
          </Alert>
        )}

        <RHFAppInput
          label="Amount"
          pattern={/^\d*\.?\d*$/}
          endAdornment={
            account &&
            pair && (
              <InputAdornment position="end">
                <Button
                  onClick={() => pair && setValue('amount', _balance)}
                  size="small"
                  variant="outlined"
                  color="secondary">
                  MAX
                </Button>
              </InputAdornment>
            )
          }
          helperText={pair && `Available: ${_balance} ${pair.from_symbol} Tokens`}
          controller={{
            control,
            name: 'amount',
            rules: {
              required: { value: true, message: 'This field is required.' },
              validate: (v: string) => {
                if (!pair) return;
                const b = new BigNumber(v);

                if (b.isLessThan(pair.min_amount)) {
                  return `Amount min is ${pair?.min_amount}.`;
                }

                if (b.isGreaterThan(_balance)) {
                  return `Insufficient ${pair?.from_symbol} token balance.`;
                }

                if (b.isGreaterThan(pair.max_amount)) {
                  return `Amount max is ${pair?.max_amount}.`;
                }

                return;
              },
            },
          }}
        />

        {account && matchChain && (
          <Alert icon={<AlertIcon />}>
            Your swap address will be your receiving address, please switch the network to check
            your balance after completion.
          </Alert>
        )}

        <Portal
          disablePortal={!mobile}
          container={isClient() ? document.getElementById('__next') : null}>
          <Button
            onClick={mobile ? onSubmit : undefined}
            variant="contained"
            disabled={!pair || loading.approve || loading.balance || !matchChain}
            fullWidth
            sx={{
              [QueryMapping.mobile]: {
                position: 'sticky',
                bottom: 16,
                left: 16,
                width: 'calc(100% - 32px)',
              },
            }}
            type="submit">
            {account
              ? pair?.from_address
                ? isApproved
                  ? 'Next'
                  : 'Approve'
                : 'Next'
              : 'Connect Wallet'}
          </Button>
        </Portal>

        {pair && (
          <Alert icon={<Zap />}>
            <AlertTitle
              sx={{ mb: 2 }}>{`I want to swap ${pair?.from_symbol} in this order`}</AlertTitle>

            <div>{`1. Minimum amount is ${pair.min_amount} ${pair.from_symbol}`}</div>
            <div>{`2. Maximum amount is ${pair.max_amount} ${pair.from_symbol}`}</div>
          </Alert>
        )}
      </Paper>
    </>
  );
};

Home.getLayout = getIndexLayout;

export default Home;
