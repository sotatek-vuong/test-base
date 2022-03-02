import { List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { BaseDialog } from '@/components/index';

import { BaseDialogProps } from '@/components/core/BaseDialog';
import { ChainAssets } from '@/utils/constants/chains';
import React from 'react';
import { Check } from '@/icons';

const available = ChainAssets.filter((x) => x.id);

export interface NetworkDialogProps extends BaseDialogProps {
  defaultChainId?: number;
  disabledChainIds?: number[];
  onChangeNetwork?: (next: number) => any;
}

export const NetworkDialog: React.FC<NetworkDialogProps> = ({
  defaultChainId,
  onChangeNetwork,
  disabledChainIds = [],
  ...props
}) => {
  return (
    <BaseDialog title="Select a network" {...props} PaperProps={{ sx: { px: 0 } }}>
      <List disablePadding>
        {available.map(({ id, txt, icon }, index) => {
          const selected = defaultChainId !== undefined && defaultChainId === id;

          const disabled = disabledChainIds.includes(id);

          return (
            <ListItemButton
              disabled={disabled}
              onClick={() => id && onChangeNetwork && onChangeNetwork(id)}
              alignItems="center"
              sx={{
                px: 4,
                py: 2,
                color: 'grey.700',
                fontWeight: 400,
                '& > svg': { color: 'success.main' },
                '&:hover': { fontWeight: 500, color: 'grey.900' },
              }}
              key={index}>
              <ListItemIcon sx={{ minWidth: 25 + 12 }}>
                <img src={icon} alt={txt} width={24} height={24} />
              </ListItemIcon>
              <ListItemText sx={{ m: 0 }} primary={txt} />

              {selected && <Check />}
            </ListItemButton>
          );
        })}
      </List>
    </BaseDialog>
  );
};
