import { QueryMapping, useAppWeb3 } from '@/hooks';
import { ArrowDown, Hamburger, Logo } from '@/icons';
import { shortenAddress } from '@/utils';
import { AppBar, Button, Menu, MenuItem, Container, Stack, Box, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { Link } from '@/components';
import { findChainAsset } from '@/web3';

export const Header: React.FC = () => {
  const { account, isActive, connect, disconnect, changeChain, chainName } = useAppWeb3();

  const chainInfo = findChainAsset(chainName);

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const hiddenOnMobile = { [QueryMapping.mobile]: { display: 'none' } };

  return (
    <AppBar
      position="sticky"
      sx={{
        borderRadius: 0,
        bgcolor: '#fff',
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}>
      <Container sx={{ display: 'flex', alignItems: 'center', height: 80 }}>
        <IconButton sx={{ color: 'secondary.main', mr: 3, display: { md: 'none' } }}>
          <Hamburger />
        </IconButton>

        <Link href="/" noLinkStyle sx={{ height: 40 }}>
          <Logo />
        </Link>

        <div style={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={2}>
          {account && (
            <Button sx={hiddenOnMobile} variant="text" component={Link} href="/history">
              History
            </Button>
          )}

          {chainInfo && (
            <Button
              onClick={changeChain}
              sx={{ px: 1.5 }}
              variant="outlined"
              startIcon={<img src={chainInfo.icon} alt={chainInfo.txt} width={24} height={24} />}
              endIcon={<ArrowDown />}>
              <Box component="span" sx={{ mr: 1 }}>
                {chainInfo.shortTxt}
              </Box>
            </Button>
          )}
          <Button sx={hiddenOnMobile} onClick={account ? handleClick : connect}>
            {account ? shortenAddress(account!) : 'Connect Wallet'}
          </Button>
          <Menu
            MenuListProps={{ sx: { py: 0 } }}
            PaperProps={{ sx: { borderRadius: 0.5 }, variant: 'outlined', elevation: 0 }}
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
