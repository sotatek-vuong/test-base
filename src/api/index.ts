import { Coin, request, TokenPair } from '@/utils';
import _ from 'lodash';

export const fetchTokenPairs = async () => {
  const { data } = await request.get<TokenPair[]>('/tokenPair/get');
  return data;
};
export const fetchCoinImages = async () => {
  const { data } = await request.get<Coin[]>('/coinImage/get');

  return [
    ...data,
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
