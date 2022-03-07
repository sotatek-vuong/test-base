import React, { useState, forwardRef } from 'react';
import { BaseDialog, BaseDialogProps } from '@/components';
import {
  Typography,
  Box,
  Stack,
  Paper,
  Checkbox,
  FormControlLabel,
  Link,
  Button,
} from '@mui/material';
import { ArrowRight } from '@/icons';
import { PromptFn, QueryMapping, useDialogPrompt } from '@/hooks';
import { BridgeFormInterface, shortenAddress } from '@/utils';
import { findChainAsset } from '@/web3';

export interface ConfirmDialogProps extends Omit<BaseDialogProps, 'open' | 'onClose'> {}

export type ConfirmPromptFn = PromptFn<boolean, BridgeFormInterface>;

export const ConfirmDialog = forwardRef<ConfirmPromptFn, ConfirmDialogProps>((props, ref) => {
  const { open, params, handleResolve, handleReject } = useDialogPrompt(ref);

  const [agreeTerms, setAgreeTerms] = useState(false);

  const fromAsset = findChainAsset(params?.pair?.from_chain);
  const toAsset = findChainAsset(params?.pair?.to_chain);

  // const coins = useSelector((s) =>
  //   s.meta.coins.data.find((x) => x.symbol === params?.pair?.to_symbol),
  // );

  return (
    <BaseDialog
      {...props}
      title="Confirm"
      open={open}
      onClose={handleReject}
      PaperProps={{
        sx: { px: 2.5, py: 2 },
      }}
      titleProps={{ sx: { p: 0, mb: 3 }, align: 'left' }}>
      <Stack spacing={3}>
        {params?.amount && (
          <Typography variant="h2">{`${params?.amount} ${params?.pair?.from_symbol}`}</Typography>
        )}

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
          <Chain label="From" value={fromAsset} />

          <Chain label="To" value={toAsset} />
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

        <Stack spacing={1.5}>
          <Row
            label="Asset:"
            value={
              fromAsset && (
                <>
                  <img src={fromAsset.icon} alt="Asset" />
                  <span>{fromAsset.txt}</span>
                </>
              )
            }
          />
          <Row
            label="Destination:"
            value={
              toAsset && (
                <>
                  <img src={toAsset.icon} alt="Destination" />
                  <span>{shortenAddress(params!.dest, 8, 6)}</span>
                </>
              )
            }
          />
          <Row
            label="Protocol fee:"
            value={params?.pair && <span>{`~ ${0.031} ${params.pair.from_symbol}`}</span>}
          />
          <Row
            label="You will receive:"
            value={
              toAsset && (
                // <>
                // <img src={coins?.url} alt="receive" />
                <span>{`~ ${9.969} ${params?.pair?.to_symbol}`}</span>
                // </>
              )
            }
          />

          <Typography color="grey.700">
            Please initiate a single transfer , we will only monitor the first transfer
          </Typography>
        </Stack>
      </Stack>

      <FormControlLabel
        sx={{ mt: 2.5, mb: 5 }}
        value={agreeTerms}
        onChange={(e, check) => setAgreeTerms(check)}
        control={
          <Checkbox
            sx={{
              [QueryMapping.mobile]: { mt: -2.5 },
            }}
          />
        }
        label={
          <>
            I have read and agree to the <Link sx={{ display: 'inline-block' }}>Terms of Use</Link>
          </>
        }
        labelPlacement="end"
      />

      <Button onClick={() => handleResolve(true)} disabled={!agreeTerms} fullWidth>
        Confirm
      </Button>
    </BaseDialog>
  );
});

const Chain: React.FC<any> = ({ label, value }) => {
  if (!label || !value) return null;

  return (
    <Box
      sx={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        '&:first-of-type': { mr: 10 },
        [QueryMapping.mobile]: {
          '&:first-of-type': {
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
        {<img src={value?.icon} alt="chain-name" width={30} height={30} />}
        <Typography>{value?.txt}</Typography>
      </Paper>
    </Box>
  );
};

const Row: React.FC<any> = ({ label, value }) => {
  return (
    <Box
      sx={{
        color: 'grey.900',
        display: 'flex',
        alignItems: 'center',
        [QueryMapping.mobile]: {
          py: 1.5,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        },
      }}>
      {label}

      <Stack
        direction="row"
        spacing={0.5}
        sx={{ flex: 1, justifyContent: 'flex-end', alignItems: 'inherit' }}>
        {value}
      </Stack>
    </Box>
  );
};

ConfirmDialog.displayName = 'ConfirmDialog';
