import type { AddEthereumChainParameter } from '@web3-react/types';
import _ from 'lodash';
import { BigNumber } from 'ethers';
import { ChainInfo } from '@/utils';

export function getAddChainParameters(chainId: number) {
  const chainInfo = _.find(CHAINS, { chainId });

  if (chainInfo) {
    return {
      ...chainInfo,
      chainId: BigNumber.from(chainInfo.chainId).toHexString(),
    };
  }

  return null;
}
const CELO: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'CELO',
  symbol: 'CELO',
  decimals: 18,
};

const BNB: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'BNB',
  symbol: 'BNB',
  decimals: 18,
};

export const CELO_CHAIN_ID = +process.env.NEXT_PUBLIC_CELO_CHAIN_ID!;
export const BSC_CHAIN_ID = +process.env.NEXT_PUBLIC_BSC_CHAIN_ID!;

export const CHAINS: AddEthereumChainParameter[] = [
  {
    chainName: 'Celo (Mainnet)',
    rpcUrls: ['https://forno.celo.org'],
    chainId: 42220,
    nativeCurrency: CELO,
    blockExplorerUrls: ['https://explorer.celo.org'],
  },
  {
    chainName: 'BSC (Mainnet)',
    rpcUrls: ['https://forno.celo.org'],
    chainId: 56,
    nativeCurrency: BNB,
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },
  {
    chainName: 'Celo (Alfajores Testnet)',
    rpcUrls: ['https://alfajores-forno.celo-testnet.org'],
    chainId: 44787,
    nativeCurrency: CELO,
    blockExplorerUrls: ['https://alfajores-blockscout.celo-testnet.org'],
  },
  {
    chainName: 'BSC (Testnet)',
    rpcUrls: ['https://data-seed-prebsc-2-s2.binance.org:8545'],
    chainId: 97,
    nativeCurrency: BNB,
    blockExplorerUrls: ['https://bscscan.com'],
  },
];

export const CHAIN_ASSETS: ChainInfo[] = [
  {
    chainName: 'celo',
    chainId: CELO_CHAIN_ID,
    txt: 'Celo',
    shortTxt: 'Celo',
    icon: '/coins/celo.svg',
    bridge: process.env.NEXT_PUBLIC_CELO_BRIDGE_ADDRESS!,
  },
  {
    chainName: 'bsc',
    chainId: BSC_CHAIN_ID,
    txt: 'Binance Smart Chain',
    shortTxt: 'Binance',
    icon: '/coins/bsc.svg',
    bridge: process.env.NEXT_PUBLIC_BSC_BRIDGE_ADDRESS!,
  },
];
export const ChainIdToChainName = {
  [CELO_CHAIN_ID]: 'celo',
  [BSC_CHAIN_ID]: 'bsc',
};

export const findChainAsset = (chainName?: string) => {
  return _.find(CHAIN_ASSETS, { chainName });
};
