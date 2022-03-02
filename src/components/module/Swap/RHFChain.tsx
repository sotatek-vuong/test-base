import { ArrowDown } from '@/icons';
import { ChainAssets } from '@/utils/constants/chains';
import { Stack, StackProps, Paper, Typography } from '@mui/material';
import _ from 'lodash';
import React, { useRef } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { PromptNetworkDialog, NetworkPromptFn } from '@/components/index';

export interface RHFChainProps extends StackProps {
  label?: string;
  controller: UseControllerProps<Record<string, any> | any>;
  disabledChainIds?: number[];
}

export const RHFChain: React.FC<RHFChainProps> = ({
  label,
  controller,
  disabledChainIds,
  ...stackProps
}) => {
  const {
    field: { value, onChange },
  } = useController(controller);
  const dialogRef = useRef<NetworkPromptFn>();

  const assets = _.find(ChainAssets, { id: value }) || ChainAssets[0];

  return (
    <>
      <PromptNetworkDialog
        disabledChainIds={disabledChainIds}
        ref={dialogRef}
        defaultChainId={value}
      />
      <Stack
        component={Paper}
        onClick={async () => {
          const next = await dialogRef.current?.prompt();

          if (next && next !== value) onChange(next);
        }}
        spacing={2}
        {...stackProps}
        sx={{
          ...stackProps?.sx,
          cursor: 'pointer',
          py: 2,
          px: 3,
          borderColor: 'primary.main',
          borderWidth: 1,
          borderStyle: 'solid',
          bgcolor: 'grey.50',
        }}>
        <Typography color="primary">{label}</Typography>

        <img src={assets.icon} width={32} height={32} alt={assets.txt} />

        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'flex-start',
            color: 'grey.900',
            '& > svg': { flexShrink: 0 },
            '& > span': { flex: '1 1 auto', maxWidth: 140, wordBreak: 'break-word' },
          }}>
          <Typography variant="h4" component="span">
            {assets.txt}
          </Typography>
          <ArrowDown />
        </Stack>
      </Stack>
    </>
  );
};
