/* eslint-disable react-hooks/exhaustive-deps */
import {
  CircularProgress,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  ListItemButtonProps,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { BaseDialog, BaseDialogProps, AppInput } from '@/components';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Check, Search } from '@/icons';
import { TokenPair } from '@/utils';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { useBalance } from '@/hooks';
import { utils } from 'ethers';

export interface TokenPairDialogProps extends BaseDialogProps {
  loading?: boolean;
  tokenPairs?: TokenPair[];
  selectedId?: string;
  onChangeToken?: (token: TokenPair) => any;
}

export const TokenPairDialog: React.FC<TokenPairDialogProps> = ({
  loading,
  tokenPairs = [],
  onChangeToken,
  selectedId,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');

  const handleSearch = useCallback(
    _.debounce((txt) => setSearch(txt), 400),
    [],
  );

  const filtered = useMemo(
    () =>
      _.filter(tokenPairs, (o) => {
        if (!search) return true;
        if (utils.isAddress(search)) {
          return o.from_address === search;
        }
        return o.from_symbol.toLowerCase().includes(search.toLowerCase());
      }),
    [search, tokenPairs.length],
  );

  return (
    <BaseDialog
      scroll="paper"
      keepMounted
      TransitionProps={{ unmountOnExit: false }}
      title="Select a Token"
      PaperProps={{ sx: { px: 0, height: '100%', maxHeight: 560 } }}
      {...props}>
      <DialogTitle sx={{ pb: 2, px: 4 }}>
        <AppInput
          value={inputValue}
          onChange={(e) => {
            const txt = e.target.value;
            setInputValue(txt);
            handleSearch(txt);
          }}
          placeholder="Search name or paste address"
          startAdornment={
            <InputAdornment sx={{ color: '#BDBDBD' }} position="start">
              <Search />
            </InputAdornment>
          }
        />
      </DialogTitle>

      <DialogContent
        sx={{
          p: 0,
          display: 'flex',
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'grey.200',
            borderRadius: '10px',
          },
        }}>
        {loading ? (
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress />
          </Box>
        ) : _.isEmpty(filtered) ? (
          <Stack
            spacing={2}
            sx={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              color: 'grey.700',
              '& > span': { mt: 2 },
            }}>
            <img alt="empty" src="/assets/not-found.svg" />

            <span>Not Found</span>
          </Stack>
        ) : (
          <List sx={{ flex: '1' }} disablePadding>
            {filtered.map((token, index) => (
              <WithBalance
                selectedId={selectedId}
                token={token}
                key={index}
                onClick={() => onChangeToken?.(token)}
              />
            ))}
          </List>
        )}
      </DialogContent>
    </BaseDialog>
  );
};

interface WithBalanceProps extends ListItemButtonProps {
  selectedId?: string;
  token: TokenPair;
}

const WithBalance: React.FC<WithBalanceProps> = ({ onClick, token, selectedId }) => {
  const { from_address, from_symbol } = token;
  const coins = useSelector((s) => s.meta.coins.data);

  const selected = selectedId && selectedId === from_address;

  const coin = _.find(coins, { symbol: from_symbol });

  const { balance, loading } = useBalance(from_address);

  return (
    <ListItemButton
      onClick={onClick}
      alignItems="center"
      sx={{
        px: 4,
        py: 2,
        color: 'secondary.main',
        fontWeight: 500,
        '& > span': { flex: '1 1 auto' },
        '& > svg': { flexShrink: 0, color: 'success.main', ml: 1 },
      }}>
      <ListItemIcon sx={{ minWidth: 25 + 12 }}>
        {coin && <img src={coin.url} alt={from_symbol} width={24} height={24} />}
      </ListItemIcon>

      <ListItemText
        sx={{ flex: '0 1 200px' }}
        disableTypography={false}
        primaryTypographyProps={{
          component: 'div',
          color: 'inherit',
          sx: { '& > .grey': { color: 'grey.700', fontWeight: 400 } },
        }}
        primary={
          <>
            <span>{coin?.symbol}</span>
            <span className="grey">{` / ${coin?.name}`}</span>
          </>
        }
      />

      <span>{loading ? 'Loading...' : balance.toFixed(2)}</span>
      {selected && <Check />}
    </ListItemButton>
  );
};
