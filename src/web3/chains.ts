import type { AddEthereumChainParameter } from '@web3-react/types';
import _ from 'lodash';
import { BigNumber } from 'ethers';

export function getAddChainParameters(chainId: number) {
  const chainInfo = _.find(CHAINS, { chainId });

  if (!chainInfo && process.env.NODE_ENV !== 'production') {
    console.warn('Dev: Unsupported network');
  }

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

export const CHAIN_IDS = [
  process.env.NEXT_PUBLIC_CELO_CHAIN_ID!,
  process.env.NEXT_PUBLIC_BSC_CHAIN_ID!,
].map(Number);

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
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    chainId: 97,
    nativeCurrency: BNB,
    blockExplorerUrls: ['https://bscscan.com'],
  },
];
