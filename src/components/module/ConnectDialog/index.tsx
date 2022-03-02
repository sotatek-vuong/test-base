import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { BaseDialog, BaseDialogProps, Link } from '@/components/index';
import { Typography, Box, Stack, Checkbox, FormControlLabel } from '@mui/material';
import { ChainAssets } from '@/utils/constants/chains';
import { Metamask, CheckCircle } from '@/icons';

export interface ConnectDialogProps extends Omit<BaseDialogProps, 'open' | 'onClose'> {}

type UserSelection = {
  wallet: 'binance' | 'metamask';
  chainId: number;
  agreeTerms: boolean;
} | null;

export type ConnectDialogRefProps =
  | {
      userSelectWallet: () => Promise<UserSelection>;
    }
  | undefined;

export const ConnectDialog = forwardRef<ConnectDialogRefProps, ConnectDialogProps>((props, ref) => {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState<Partial<UserSelection>>(null);

  useEffect(() => {
    if (open) {
      setData(null);
    }
  }, [open]);

  const promiseRef = useRef<{ resolve: (value: UserSelection) => void } | null>(null);

  const prompt = useCallback(() => {
    setOpen(true);
    return new Promise<UserSelection>((resolve) => {
      promiseRef.current = { resolve };
    });
  }, []);

  useImperativeHandle(ref, () => ({ userSelectWallet: prompt }), [prompt]);

  const handleClose = useCallback(() => {
    setOpen(false);
    promiseRef.current = null;
  }, [promiseRef.current]);

  const handleResolve = useCallback(
    (next: UserSelection) => {
      promiseRef.current?.resolve(next);
      handleClose();
    },
    [handleClose],
  );

  useEffect(() => {
    if (data && data.agreeTerms && data.chainId && data.wallet) {
      // @ts-ignore
      handleResolve(data);
    }
  }, [data?.agreeTerms, data?.chainId, data?.wallet]);

  const handleReject = useCallback(() => {
    promiseRef.current?.resolve(null);
    handleClose();
  }, [handleClose]);

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
            {ChainAssets.map((chain, index) => {
              const isSelected = data?.chainId === chain.id;
              return (
                <BoxWithTitle
                  onClick={() => setData((prev) => ({ ...prev, chainId: chain.id }))}
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
              src={Metamask}
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
      {typeof src === 'string' ? (
        <img src={src} alt={alt} {...assetProps} />
      ) : (
        React.createElement(src, assetProps)
      )}
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
