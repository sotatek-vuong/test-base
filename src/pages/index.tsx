import {
  Alert,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import type { NextPage } from 'next';
import {
  AppInput,
  getIndexLayout,
  Link,
  RHFAddressInput,
  RHFAppInput,
  RHFChain,
  TokenDialogPrompt,
  TokenDialogRefProps,
} from '@/components/index';
import { Controller, useForm } from 'react-hook-form';
import { Swap, Metamask, ArrowDown, Alert as AlertIcon } from '@/icons';
import { useRef, useEffect } from 'react';
import { useAppWeb3, useBalance } from '../hooks';
import { ERC20Token } from '@/utils/types';
import { getCoinPathBySymbol } from '@/utils/helpers';
import { MOCKUP_TOKENS } from '@/utils/constants/tokens';
import { utils } from 'ethers';
import { BigNumber } from 'bignumber.js';

interface SwapForm {
  from?: number;
  to?: number;
  desc: string;
  amount: string;
  token: ERC20Token | null;
}

const Home: NextPage = () => {
  const { account = '', changeChain } = useAppWeb3();
  const tokenDialogRef = useRef<TokenDialogRefProps>()!;

  const { control, handleSubmit, watch, getValues, setValue } = useForm<SwapForm>({
    defaultValues: {
      from: +process.env.NEXT_PUBLIC_CELO_CHAIN_ID!,
      to: +process.env.NEXT_PUBLIC_BSC_CHAIN_ID!,
      desc: account,
      amount: '',
      token: _.find(MOCKUP_TOKENS, { symbol: 'CELO' }) || null,
    },
    mode: 'all',
  });

  const [curFrom, curTo, curToken] = watch(['from', 'to', 'token']);

  const { balance } = useBalance(curToken?.address);

  useEffect(() => {
    if (account) {
      setValue('desc', account, { shouldDirty: true, shouldTouch: true });
    }
  }, [account]);

  const _balance = utils.formatEther(balance);

  return (
    <>
      <TokenDialogPrompt ref={tokenDialogRef} chainId={curFrom} />
      {account && (
        <Typography align="center" variant="h4" sx={{ mt: 5 }}>
          Daily quota 65,746.21 USDT per address (0.00 USDT / 65,746.21 USDT)
        </Typography>
      )}
      <Container maxWidth="md" sx={{ my: 5 }}>
        <Stack
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(console.log)}
          spacing={2}>
          <Paper component={Stack} spacing={3} sx={{ p: 5 }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ position: 'relative', '& > *': { flex: '1' } }}>
              <RHFChain
                disabledChainIds={curTo ? [curTo] : undefined}
                controller={{ control, name: 'from' }}
                label="From"
              />

              <IconButton
                color="secondary"
                onClick={() => {
                  const [from, to] = getValues(['from', 'to']);
                  setValue('from', to);
                  setValue('to', from);
                  setValue('token', null);
                }}
                disableRipple
                style={{ margin: 0 }}
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}>
                <Swap />
              </IconButton>

              <RHFChain
                disabledChainIds={curFrom ? [curFrom] : undefined}
                controller={{ control, name: 'to' }}
                label="To"
              />
            </Stack>

            <Controller
              control={control}
              name="token"
              render={({ field: { value, onChange } }) => {
                return (
                  <AppInput
                    readOnly
                    startAdornment={
                      value && (
                        <InputAdornment position="start">
                          <img
                            src={getCoinPathBySymbol(value.symbol)}
                            alt={value.name}
                            width={24}
                            height={24}
                          />
                        </InputAdornment>
                      )
                    }
                    endAdornment={
                      <InputAdornment position="start" sx={{ color: 'inherit' }}>
                        <ArrowDown />
                      </InputAdornment>
                    }
                    value={value?.name || ''}
                    label="Asset"
                    onClick={async () => {
                      const token = await tokenDialogRef.current?.userSelectToken();
                      if (token) {
                        onChange(token);
                      }
                    }}
                  />
                );
              }}
            />

            {account && (
              <RHFAddressInput
                label="Destination"
                startAdornment={
                  <InputAdornment position="start">
                    <Metamask />
                  </InputAdornment>
                }
                helperText="This is the arrival network address"
                controller={{ control, name: 'desc' }}
              />
            )}

            <RHFAppInput
              label="Amount"
              pattern={/^\d*\.?\d*$/}
              endAdornment={
                account && (
                  <InputAdornment position="end">
                    <Button
                      onClick={() => setValue('amount', _balance)}
                      size="small"
                      variant="outlined"
                      color="secondary">
                      MAX
                    </Button>
                  </InputAdornment>
                )
              }
              helperText={
                account &&
                curToken &&
                _balance &&
                `Available: ${_balance} ${curToken!.symbol} Tokens`
              }
              controller={{
                control,
                name: 'amount',
                rules: {
                  validate: (v: string) =>
                    new BigNumber(v).isGreaterThan(_balance)
                      ? `Insufficient ${curToken?.symbol} token balance`
                      : undefined,
                },
              }}
            />

            {account && (
              <Alert
                variant="outlined"
                sx={{
                  color: 'grey.800',
                }}
                icon={<AlertIcon />}>
                Your swap address will be your receiving address, please switch the network to check
                your balance after completion.
              </Alert>
            )}

            <Button fullWidth type="submit">
              {'Connect Wallet'}
            </Button>
          </Paper>
          <Paper sx={{ p: 2, textAlign: 'center', fontWeight: 'bold' }}>
            <Link href="/assets">View Proof Of Assets</Link>
            <br />
            <Link href="/guide">User Guide</Link>
          </Paper>

          <Typography variant="body2" color="grey.700" sx={{ alignSelf: 'center' }}>
            The safe, fast and most secure way to bring cross-chain assets to Plastik chains
          </Typography>
        </Stack>
      </Container>
    </>
  );
};

Home.getLayout = getIndexLayout;

export default Home;
