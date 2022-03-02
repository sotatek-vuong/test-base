export const ChainAssets = [
  {
    id: +(process.env.NEXT_PUBLIC_CELO_CHAIN_ID || '42220'),
    txt: 'Celo',
    shortTxt: 'Celo',
    icon: '/coins/celo.svg',
  },
  {
    id: +(process.env.NEXT_PUBLIC_BSC_CHAIN_ID || '56'),
    txt: 'Binance Smart Chain',
    shortTxt: 'Binance',
    icon: '/coins/bsc.svg',
  },
];
