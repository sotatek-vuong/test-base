import React, { forwardRef } from 'react';
import { BaseDialog, BaseDialogProps } from '@/components';
import { Typography, Box, Stack, Paper } from '@mui/material';
import { CheckCircle, ArrowRight } from '@/icons';
import { PromptFn, QueryMapping, useDialogPrompt } from '@/hooks';
import { BridgeFormInterface } from '@/utils';
import { findChainAsset } from '@/web3';

export interface ConfirmDialogProps extends Omit<BaseDialogProps, 'open' | 'onClose'> {}

export type ConfirmPromptFn = PromptFn<boolean, BridgeFormInterface>;

export const ConfirmDialog = forwardRef<ConfirmPromptFn, ConfirmDialogProps>((props, ref) => {
  const { open, params, handleResolve, handleReject } = useDialogPrompt(ref);

  return (
    <BaseDialog
      {...props}
      title="Confirm"
      open={open}
      onClose={handleReject}
      PaperProps={{
        sx: { px: 2.5, py: 3 },
      }}
      titleProps={{ sx: { p: 0, mb: 3 }, align: 'left' }}>
      <Stack spacing={3}>
        <Typography variant="h2">{`${params?.amount} ${params?.pair?.from_symbol}`}</Typography>

        <Paper
          sx={{
            p: 2,
            display: 'flex',
            bgcolor: 'grey.50',
            position: 'relative',

            [QueryMapping.mobile]: {
              flexDirection: 'column',
            },
          }}>
          <Chain label="From" value={params?.pair?.from_chain} />

          <Chain label="To" value={params?.pair?.to_chain} />
          <Box
            sx={{
              color: 'primary.main',
              position: 'absolute',
              left: '50%',
              top: 'calc(12px + 50%)',
              lineHeight: 1,
              transform: 'translate(-50%, -50%)',
              [QueryMapping.mobile]: {
                top: 'calc(4px + 50%)',
                transform: 'translate(-50%, -50%) rotateZ(90deg)',
              },
            }}>
            <ArrowRight />
          </Box>
        </Paper>

        <pre style={{ color: 'red' }}>{JSON.stringify(params, null, 3)}</pre>
      </Stack>
    </BaseDialog>
  );
});

interface ChainProps {
  label?: string;
  value?: string;
}

const Chain: React.FC<ChainProps> = ({ label, value }) => {
  const asset = findChainAsset(value);

  return (
    <Box
      sx={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        '&:first-child': { mr: 10 },
        [QueryMapping.mobile]: {
          '&:first-child': {
            mr: 0,
            mb: 4,
          },
        },
      }}>
      <Typography
        color="primary"
        sx={{
          mb: 1.5,
          [QueryMapping.mobile]: { mb: 0.5 },
        }}>
        {label}
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          flex: 1,
          borderColor: 'primary.main',
          borderRadius: 0.5,
          p: 2,
          textAlign: 'center',
        }}>
        <img src={`/coins/${value}.svg`} alt="chain-name" width={30} height={30} />
        <Typography>{asset?.txt}</Typography>
      </Paper>
    </Box>
  );
};

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

ConfirmDialog.displayName = 'ConfirmDialog';
