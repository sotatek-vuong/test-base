import { BigNumber } from 'ethers';

export const isClient = () => {
  return typeof window !== 'undefined';
};

export const hasMetamask = () => {
  // @ts-ignore
  return isClient() && typeof window.ethereum !== 'undefined';
};

export const hasBinanceWallet = () => {
  // @ts-ignore
  return isClient() && typeof window.BinanceChain !== 'undefined';
};

export const shortenAddress = (input: string, start = 4, end = 4) => {
  const length = input?.length;

  if (length) {
    return input.substring(0, start) + '...' + input.substring(length - end, length);
  }
  return input;
};

export const getCoinPathBySymbol = (symbol: string, extension = 'svg') => {
  return `/coins/${symbol.toLowerCase()}.${extension}`;
};

export const isNativeToken = (address: any): address is string => {
  return typeof address === 'string' && Boolean(address) && BigNumber.from(address).eq(0);
};
