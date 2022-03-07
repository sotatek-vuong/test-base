import { ArrowDown } from '@/icons';
import { Chip, PaperProps, Paper, Typography } from '@mui/material';
import _ from 'lodash';
import React, { useCallback, useRef } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { PromptNetworkDialog, NetworkPromptFn } from '@/components';
import { findChainAsset } from '@/web3';
import { QueryMapping, useAppWeb3, useBreakpoint } from '@/hooks';
import { Box } from '@mui/system';

interface RHFChainProps extends PaperProps {
  label?: string;
  controller: UseControllerProps<Record<string, any> | any>;
}

export const RHFChain: React.FC<RHFChainProps> = ({ label, controller, ...paperProps }) => {
  const { chainName } = useAppWeb3();
  const {
    field: { value, onChange },
  } = useController(controller);
  const dialogRef = useRef<NetworkPromptFn>();

  const mobile = useBreakpoint('mobile');

  const assets = findChainAsset(value);

  const handleClick = useCallback(async () => {
    const next = await dialogRef.current?.prompt();

    if (next && next !== value) onChange(next);
  }, []);

  const matchChain = chainName === value;

  const _label = (
    <Typography
      color="primary"
      sx={{
        mb: 1,
        [QueryMapping.mobile]: {
          mb: 0.25,
        },
      }}>
      {label}
    </Typography>
  );
  const coinImage = <img src={assets?.icon} width={32} height={32} alt={assets?.txt} />;

  return (
    <Box>
      <PromptNetworkDialog ref={dialogRef} defaultChain={value} />

      {mobile && _label}
      <Paper
        onClick={handleClick}
        {...paperProps}
        sx={{
          ...paperProps?.sx,
          cursor: 'pointer',
          px: 2.5,
          py: 2,
          [QueryMapping.mobile]: {
            px: 1.5,
            py: 1.25,
            maxHeight: 52,
          },

          borderColor: 'primary.main',
          borderWidth: 1,
          height: '100%',
          borderStyle: 'solid',
          bgcolor: 'grey.50',

          display: 'flex',
          flexDirection: { md: 'column' },

          '& > *:not(:last-child)': {
            mb: 1.5,
            [QueryMapping.mobile]: {
              mb: 0,
            },
          },
        }}>
        {!mobile && _label}

        {coinImage}

        <Box
          sx={{
            ml: 0,
            alignItems: 'flex-start',
            [QueryMapping.mobile]: {
              alignItems: 'center',
              ml: 2,
            },
            display: 'flex',
            flex: 1,
            color: 'grey.900',
            '& > span': { flex: '1 1 auto', wordBreak: 'break-word' },
            '& > svg': { flexShrink: 0 },
          }}>
          <Typography variant="h4" component="span">
            {assets?.txt}
          </Typography>

          {mobile && matchChain && (
            <>
              <Chip color="success" label="Connected" />
              <Box
                component="img"
                sx={{ width: 16, height: 16, ml: 1, mr: 1.5 }}
                src="/assets/metamask.svg"
                alt="metamask"
              />
            </>
          )}

          <ArrowDown />
        </Box>
      </Paper>
    </Box>
  );
};
