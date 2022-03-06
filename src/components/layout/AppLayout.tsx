import React from 'react';
import { Box, Typography, Link, LinearProgress } from '@mui/material';
import { Header } from '@/components';
import { useAppWeb3 } from '@/hooks';
import { useDispatch } from 'react-redux';
import { useEffectOnce } from 'react-use';
import { getCoins, getTokenPairs } from '@/store/actions';
export interface AppLayout {}

export const AppLayout: React.FC<AppLayout> = (props) => {
  const { chainId, isActivating, chainName, changeChain } = useAppWeb3();

  const dispatch = useDispatch();

  useEffectOnce(() => {
    dispatch(getCoins());
    dispatch(getTokenPairs());
  });

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexFlow: 'column wrap' }}>
      {isActivating ? (
        <LinearProgress />
      ) : (
        <React.Fragment>
          <Header />
          {chainId && !chainName && (
            <Typography align="center" sx={{ py: 2, bgcolor: 'error.main', color: '#fff' }}>
              {`App network (${chainId}) doesn't match to network selected in wallet (1). Learn how to change
        network in wallet or (2) `}
              <Link onClick={changeChain} fontWeight="bold" color="secondary.main">
                Change network
              </Link>
            </Typography>
          )}

          <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {props.children}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};
