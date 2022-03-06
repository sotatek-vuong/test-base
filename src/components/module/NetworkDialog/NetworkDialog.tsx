import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { BaseDialog, BaseDialogProps } from '@/components';

import { CHAIN_ASSETS } from '@/web3';
import React from 'react';
import { Check } from '@/icons';

export interface NetworkDialogProps extends BaseDialogProps {
  defaultChain?: string;
  disabledChains?: (string | undefined)[];
  onChangeChain?: (next: string) => any;
}

export const NetworkDialog: React.FC<NetworkDialogProps> = ({
  defaultChain,
  onChangeChain,
  disabledChains = [],
  ...props
}) => {
  return (
    <BaseDialog title="Select a network" {...props} PaperProps={{ sx: { px: 0 } }}>
      <List disablePadding>
        {CHAIN_ASSETS.map(({ chainName, txt, icon }, index) => {
          const selected = defaultChain && defaultChain === chainName;

          const disabled = disabledChains.includes(chainName);

          return (
            <ListItemButton
              disabled={disabled}
              onClick={() => chainName && onChangeChain && onChangeChain(chainName)}
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
