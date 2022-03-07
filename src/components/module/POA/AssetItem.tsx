import { isNativeToken, TokenPair } from '@/utils';
import { Box, Chip, IconButton, Stack, Typography } from '@mui/material';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Copy, Redirect } from '@/icons';
import { NULL_ADDRESS } from '@/hooks';
import { usePoA } from './PoAProvider';

export interface AssetItemProps {
  fromSymbol: string;
  items: TokenPair[];
}

export const AssetItem: React.FC<AssetItemProps> = ({ fromSymbol, items }) => {
  const coins = useSelector((s) => s.meta.coins.data);

  const coinImages = _.find(coins, { symbol: fromSymbol });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        py: 2.5,
        borderColor: 'divider',
        borderStyle: 'none none solid',
        borderWidth: 1,
        '&:first-of-type': {
          borderStyle: 'solid none',
        },
      }}>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <img width={36} height={36} src={coinImages?.url} alt={coinImages?.name} />
        <Typography fontWeight="bold">{coinImages?.symbol}</Typography>
      </Stack>

      <Stack spacing={2}>
        {items.map((data, key) => (
          <TokenItem key={key} data={data} />
        ))}
      </Stack>
    </Box>
  );
};

const TokenItem: React.FC<{ data: TokenPair }> = ({ data }) => {
  const isNative = isNativeToken(data.from_address);

  const { value: funds, loading } = usePoA(
    isNative ? NULL_ADDRESS : data.from_address,
    data.from_chain,
  );

  return (
    <Stack spacing={0.5}>
      <Typography fontWeight="bold">
        {loading ? 'Loading...' : `${funds.toString()} ${data.from_symbol}`}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography
          variant="body2"
          color="grey.700"
          sx={{
            width: '100%',
            maxWidth: 250,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            fontWeight: 400,
          }}>
          {data.from_address || NULL_ADDRESS}
        </Typography>

        <Chip
          color={isNative ? 'primary' : 'secondary'}
          label={isNative ? 'Native' : typeMappings[data.from_chain]}
          sx={{ width: 50 }}
        />

        {isNative ? (
          <Box width={50} />
        ) : (
          <Chip
            color={isNative ? 'primary' : 'secondary'}
            label={isNative ? 'Native' : nameMappings[data.from_chain]}
            sx={{ width: 50 }}
          />
        )}
        <Box sx={{ ml: '40px !important' }}>
          <IconButton edge="end">
            <Copy />
          </IconButton>
          <IconButton component="a" href="#" edge="end">
            <Redirect />
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  );
};

const nameMappings: any = {
  bsc: 'BSC',
  celo: 'CELO',
};

const typeMappings: any = {
  bsc: 'BEP20',
  celo: 'ERC20',
};
