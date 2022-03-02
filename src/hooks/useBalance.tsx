import { useAsync } from 'react-use';
import { useAppWeb3 } from './useAppWeb3';
import { generateErc20 } from '@/web3';
import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { isNativeToken } from '../utils';

export const useBalance = (tokenAddress?: string) => {
  const { library, account } = useAppWeb3();

  const erc20 = useMemo(
    () => (library && tokenAddress ? generateErc20(tokenAddress, library) : null),
    [library, account, tokenAddress],
  );

  const { value: balance = BigNumber.from('0'), loading } = useAsync(async () => {
    if (!library || !account || !tokenAddress) return undefined;

    if (isNativeToken(tokenAddress)) {
      return await library.getBalance(account);
    }

    return await erc20!.balanceOf(account);
  }, [library, account, tokenAddress]);

  return { balance, loading };
};
