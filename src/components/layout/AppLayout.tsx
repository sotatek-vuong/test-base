import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Header } from '@/components/index';
import { useAppWeb3 } from '@/hooks/useAppWeb3';
export interface AppLayout {}

export const AppLayout: React.FC<AppLayout> = (props) => {
  const { chainId, unsupportedChainId, changeChain } = useAppWeb3();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexFlow: 'column wrap' }}>
      <Header />
      {unsupportedChainId && (
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

      <Box component="footer">Footer goes here</Box>
    </Box>
  );
};
