import { ERC20Token } from '../types';

export const MOCKUP_TOKENS: ERC20Token[] = [
  {
    chainId: process.env.NEXT_PUBLIC_CELO_CHAIN_ID,
    name: 'Celo Dollar',
    address: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
    decimals: 18,
    symbol: 'cUSD',
  },
  {
    chainId: process.env.NEXT_PUBLIC_CELO_CHAIN_ID,
    name: 'Celo',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    symbol: 'CELO',
  },
  {
    chainId: process.env.NEXT_PUBLIC_BSC_CHAIN_ID,
    name: 'Binance USD',
    address: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee',
    decimals: 18,
    symbol: 'BUSD',
  },
  {
    chainId: process.env.NEXT_PUBLIC_BSC_CHAIN_ID,
    name: 'USDT Token',
    address: '0x337610d27c682e347c9cd60bd4b3b107c9d34ddd',
    decimals: 18,
    symbol: 'USDT',
  },
  {
    chainId: process.env.NEXT_PUBLIC_BSC_CHAIN_ID,
    name: 'BNB',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    symbol: 'BNB',
  },
];
