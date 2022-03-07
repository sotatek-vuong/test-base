import { BaseDialog, BaseDialogProps } from '@/components';
import { PromptFn, useDialogPrompt } from '@/hooks';
import { CheckBold, Warning } from '@/icons';
import { shortenAddress } from '@/utils';
import { Button, CircularProgress, Box, alpha, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import { forwardRef } from 'react';

export type TxState = 'loading' | 'error' | 'submitted';
export type TxStatePromptFn = PromptFn<boolean, TxState>;
export interface TxStateDialog extends Omit<BaseDialogProps, 'open' | 'onClose'> {}

const titleMappings: Record<TxState, any> = {
  loading: 'Waiting for Confirmation',
  error: 'Error',
  submitted: 'Transaction Submitted',
};

const iconWidth = 80;

const iconMappings: Record<TxState, any> = {
  loading: <CircularProgress size={iconWidth} />,
  error: (
    <Box
      sx={{
        color: 'error.main',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
        borderRadius: '50%',
        width: iconWidth,
        height: iconWidth,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <Warning />
    </Box>
  ),
  submitted: (
    <Box
      sx={{
        bgcolor: 'success.main',
        borderRadius: '50%',
        width: iconWidth,
        height: iconWidth,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <CheckBold />
    </Box>
  ),
};

const descMappings: Record<TxState, any> = {
  loading: 'Confirm this transaction in your wallet',
  error: 'Transaction rejected',
  submitted: 'View on History',
};

export const TxStateDialog = forwardRef<TxStatePromptFn, TxStateDialog>((props, ref) => {
  const { open, params, handleReject } = useDialogPrompt(ref);

  if (!params) return null;

  return (
    <BaseDialog
      {...props}
      title={titleMappings[params]}
      open={open}
      onClose={handleReject}
      titleProps={{ sx: { p: 0, mb: 4 }, align: 'left' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        {iconMappings[params]}

        <Typography sx={{ mt: 2.5 }}> {descMappings[params]}</Typography>

        {params !== 'loading' && (
          <Button
            onClick={handleReject}
            fullWidth
            sx={{ mt: 4 }}
            color={params === 'error' ? 'error' : 'primary'}>
            Dismiss
          </Button>
        )}
      </Box>
    </BaseDialog>
  );
});

TxStateDialog.displayName = 'TxStateDialog';
