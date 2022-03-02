import {
  CircularProgress,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { BaseDialog } from '@/components/index';
import { BaseDialogProps } from '@/components/core/BaseDialog';
import React from 'react';
import { Check, Search } from '@/icons';
import { ERC20Token } from '@/utils/types';
import { useAsync } from 'react-use';
import { getTokens } from 'src/api/mockup';
import { AppInput } from '@/components/core/AppInput';
import { Box } from '@mui/system';
import { getCoinPathBySymbol } from '@/utils/helpers';

export interface TokenDialogProps extends BaseDialogProps {
  chainId?: number;
  selectedTokenAddress?: string;
  onChangeToken?: (token: ERC20Token) => any;
}

export const TokenDialog: React.FC<TokenDialogProps> = ({
  chainId,
  selectedTokenAddress,
  onChangeToken,
  ...props
}) => {
  const { value: tokens = [], loading } = useAsync(async () => {
    return await getTokens(chainId);
  }, [chainId]);

  return (
    <BaseDialog title="Select a Token" PaperProps={{ sx: { px: 0 } }} {...props}>
      <Box pb={2} px={4}>
        <AppInput
          placeholder="Search name or paste address"
          startAdornment={
            <InputAdornment sx={{ color: '#BDBDBD' }} position="start">
              <Search />
            </InputAdornment>
          }
        />
      </Box>

      {loading ? (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <List disablePadding>
          {tokens.map((token, index) => {
            const { symbol, name, address } = token;

            const selected = selectedTokenAddress !== undefined && selectedTokenAddress === address;

            return (
              <ListItemButton
                onClick={() => address && onChangeToken && onChangeToken(token)}
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
                  <img src={getCoinPathBySymbol(symbol)} alt={name} width={24} height={24} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      color="secondary"
                      sx={{ m: 0, '& > span': { color: 'grey.700', fontWeight: 400 } }}>
                      {symbol}
                      <span>{` / ${name}`}</span>
                    </Typography>
                  }
                />

                {selected && <Check />}
              </ListItemButton>
            );
          })}
        </List>
      )}
    </BaseDialog>
  );
};
