import React, { forwardRef, useEffect, useState } from 'react';
import { BaseDialog, BaseDialogProps, Link } from '@/components';
import { Typography, Box, Stack, Checkbox, FormControlLabel } from '@mui/material';
import { CHAIN_ASSETS } from '@/web3';
import { CheckCircle } from '@/icons';
import { PromptFn, useDialogPrompt } from '@/hooks';

export interface ConnectDialogProps extends Omit<BaseDialogProps, 'open' | 'onClose'> {}

type UserSelection = {
  wallet: 'binance' | 'metamask';
  chainName: string;
  agreeTerms: boolean;
} | null;

export type ConnectPromptFn = PromptFn<UserSelection>;

export const ConnectDialog = forwardRef<ConnectPromptFn, ConnectDialogProps>((props, ref) => {
  const { open, handleResolve, handleReject } = useDialogPrompt(ref);

  const [data, setData] = useState<Partial<UserSelection>>(null);

  useEffect(() => {
    if (open) {
      setData(null);
    }
  }, [open]);

  useEffect(() => {
    if (data && data.agreeTerms && data.chainName && data.wallet) {
      // @ts-ignore
      handleResolve(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.agreeTerms, data?.chainName, data?.wallet]);

  return (
    <BaseDialog
      {...props}
      title="Connect wallet"
      open={open}
      onClose={handleReject}
      titleProps={{ sx: { p: 0, mb: 3 }, align: 'left' }}>
      <Stack spacing={3}>
        <Box>
          <Typography>
            {'1. Accept'}
            <Link href="#">Terms of Service</Link>
            {' and '}
            <Link href="#">Privacy Policy</Link>
          </Typography>

          <FormControlLabel
            sx={{ mt: '2px' }}
            value={data?.agreeTerms}
            onChange={(e, agreeTerms) => setData((prev) => ({ ...prev, agreeTerms }))}
            control={<Checkbox />}
            label="I read and accept"
            labelPlacement="end"
          />
        </Box>

        <Box>
          <Typography sx={{ mb: 2.5 }}>2. Choose Network</Typography>
          <Stack direction="row" spacing={5}>
            {CHAIN_ASSETS.map((chain, index) => {
              const isSelected = data?.chainName === chain.chainName;
              return (
                <BoxWithTitle
                  onClick={() => setData((prev) => ({ ...prev, chainName: chain.chainName }))}
                  selected={isSelected}
                  key={index}
                  title={chain.shortTxt}
                  src={chain.icon}
                  alt={chain.txt}
                />
              );
            })}
          </Stack>
        </Box>
        <Box>
          <Typography sx={{ mb: 2.5 }}>3. Choose Wallet</Typography>
          <Stack direction="row" spacing={5}>
            <BoxWithTitle
              selected={data?.wallet === 'metamask'}
              onClick={() => setData((prev) => ({ ...prev, wallet: 'metamask' }))}
              src="/assets/metamask.svg"
              width={50}
              height={50}
              title="Metamask"
              alt="metamask"
            />
          </Stack>
        </Box>
      </Stack>
    </BaseDialog>
  );
});

const BoxWithTitle: React.FC<any> = ({
  selected,
  width = 80,
  height = 80,
  title,
  alt,
  src,
  onClick,
}) => {
  const assetProps = { width, height };
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 80,
        position: 'relative',
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover p': { color: 'grey.900' },
      }}>
      <img src={src} alt={alt} {...assetProps} />
      <Typography sx={{ mt: 1 }} color={selected ? 'grey.900' : 'grey.400'}>
        {title}
      </Typography>

      {selected && (
        <Box
          component={CheckCircle}
          sx={{
            position: 'absolute',
            bottom: 30,
            right: 0,
          }}
        />
      )}
    </Box>
  );
};

ConnectDialog.displayName = 'ConnectDialog';
