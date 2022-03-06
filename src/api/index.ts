import { Coin, request, TokenPair } from '@/utils';
import _ from 'lodash';

export const fetchTokenPairs = async () => {
  // const { data } = await request.get<TokenPair[]>('/tokenPair/get');

  return [
    {
      min_amount: 0.00001,
      max_amount: 100000,
      from_address: '',
      to_address: '',
      from_chain: 'celo',
      from_symbol: 'CELO',
      to_chain: 'bsc',
      to_symbol: 'BNB',
    },
    {
      min_amount: 0.00001,
      max_amount: 100000,
      from_address: '',
      to_address: '',
      from_chain: 'bsc',
      from_symbol: 'BNB',
      to_chain: 'celo',
      to_symbol: 'CELO',
    },
    {
      min_amount: 0.00001,
      max_amount: 100000,
      from_address: '0xa949B66461B78ABE0a92C82175fB00e1f04C00aA',
      to_address: '0x1814F74739DB19dEf3b32d9986D3aE94Cc6577D3',
      from_chain: 'celo',
      from_symbol: 'PLASTIK',
      to_chain: 'bsc',
      to_symbol: 'PLASTIK',
    },
    {
      min_amount: 0.00001,
      max_amount: 100000,
      from_address: '0x1814F74739DB19dEf3b32d9986D3aE94Cc6577D3',
      to_address: '0xa949B66461B78ABE0a92C82175fB00e1f04C00aA',
      from_chain: 'bsc',
      from_symbol: 'PLASTIK',
      to_chain: 'celo',
      to_symbol: 'PLASTIK',
    },
  ] as TokenPair[];
};
export const fetchCoinImages = async () => {
  // const { data } = await request.get<Coin[]>('/coinImage/get');

  return [
    {
      name: 'Plastik',
      symbol: 'PLASTIK',
      url: '/coins/plastik.svg',
    },
    {
      name: 'BNB',
      symbol: 'BNB',
      url: '/coins/bnb.svg',
    },
    {
      name: 'CELO',
      symbol: 'CELO',
      url: '/coins/celo.svg',
    },
  ] as Coin[];
};
