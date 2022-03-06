import { AppInput, TokenPairDialogPrompt, TokenPromptFn } from '@/components';
import { RHFAppInputProps } from '@/components/core/AppInput';
import { useAppWeb3 } from '@/hooks';
import { AddCircle, ArrowDown } from '@/icons';
import { getCoinPathBySymbol } from '@/utils';
import { Box, InputAdornment, Link, Stack } from '@mui/material';
import { useRef } from 'react';
import { useController } from 'react-hook-form';

interface RHFAssetProps extends RHFAppInputProps {
  from?: string;
  to?: string;
}

export const RHFAsset: React.FC<RHFAssetProps> = ({ controller, sx, from, to }) => {
  const tokenDialogRef = useRef<TokenPromptFn>();
  const {
    field: { onChange, value },
  } = useController(controller);
  const { chainName, addToken } = useAppWeb3();

  return (
    <Box sx={sx}>
      <TokenPairDialogPrompt ref={tokenDialogRef} selectedId={value?.from_address} />

      <AppInput
        readOnly
        startAdornment={
          value && (
            <InputAdornment position="start">
              <img
                src={getCoinPathBySymbol(value.from_symbol)}
                alt={value.from_symbol}
                width={24}
                height={24}
              />
            </InputAdornment>
          )
        }
        endAdornment={
          <InputAdornment position="start" sx={{ color: 'inherit' }}>
            <ArrowDown />
          </InputAdornment>
        }
        // @ts-ignore
        helperText={
          value && (
            <Stack direction="row" spacing={1}>
              <AddCircle />
              <Link
                onClick={() =>
                  value &&
                  addToken({
                    address: value.from_address,
                    decimals: 18,
                    symbol: value.from_symbol,
                  })
                }
                color="grey.700"
                fontWeight={400}>{`Add ${value.from_symbol} to MetaMask`}</Link>
            </Stack>
          )
        }
        value={value?.from_symbol || ''}
        label="Asset"
        onClick={async () => {
          const token = await tokenDialogRef.current?.prompt({ from, to });
          token && onChange(token);
        }}
      />
    </Box>
  );
};
