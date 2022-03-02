import { useAppWeb3 } from '@/hooks/useAppWeb3';
import { ArrowDown, Logo } from '@/icons';
import { shortenAddress } from '@/utils/helpers';
import { AppBar, Button, Menu, MenuItem, Container, Stack } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { ChainAssets } from '@/utils/constants/chains';
import _ from 'lodash';
import { Link } from '@/components/index';

export const Header: React.FC = () => {
  const { account, connect, disconnect, changeChain, chainId } = useAppWeb3();

  const currentChain = _.find(ChainAssets, { id: chainId });

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="relative"
      sx={{ bgcolor: '#fff', borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
      <Container sx={{ display: 'flex', alignItems: 'center', height: 80 }}>
        <Link href="/" noLinkStyle sx={{ height: 40 }}>
          <Logo />
        </Link>

        <div style={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={2}>
          {account && (
            <Button variant="text" component={Link} href="/history">
              History
            </Button>
          )}

          {currentChain && (
            <Button
              onClick={changeChain}
              sx={{ px: 1.5 }}
              variant="outlined"
              startIcon={
                <img src={currentChain.icon} alt={currentChain.txt} width={24} height={24} />
              }
              endIcon={<ArrowDown />}>
              <Box component="span" sx={{ mr: 1 }}>
                {currentChain.txt}
              </Box>
            </Button>
          )}
          <Button onClick={account ? handleClick : connect}>
            {account ? shortenAddress(account!) : 'Connect Wallet'}
          </Button>
          <Menu
            MenuListProps={{ sx: { py: 0 } }}
            PaperProps={{ sx: { borderRadius: 0.5 }, variant: 'outlined' }}
            sx={{ mt: 0.5 }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}>
            <MenuItem
              onClick={() => {
                disconnect();
                handleClose();
              }}>
              Disconnect
            </MenuItem>
          </Menu>
        </Stack>
      </Container>
    </AppBar>
  );
};
