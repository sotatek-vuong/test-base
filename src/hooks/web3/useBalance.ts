import BigNumber from 'bignumber.js';
import { utils } from 'ethers';
import { useAsyncRetry } from 'react-use';
import { useAppWeb3 } from '../useAppWeb3';
import { AddressOrERC20, useERC20Contract } from './useContract';

// if native, pass undefined as parameter
export const useBalance = (token?: AddressOrERC20) => {
  const { provider, account } = useAppWeb3();

  const erc20 = useERC20Contract(token);

  const {
    value: { decimals = 18, balance = 0 } = {},
    loading,
    retry: refreshBalance,
  } = useAsyncRetry(async () => {
    if (!account || !provider) return;

    let wei;
    let decimals = 18;
    if (!erc20) {
      wei = await provider.getBalance(account);
    } else {
      [wei, decimals] = await Promise.all([erc20.balanceOf(account), erc20.decimals()]);
    }

    return { balance: utils.formatUnits(wei, decimals), decimals };
  }, [account, erc20]);

  return { balance: new BigNumber(balance), decimals, loading, refreshBalance };
};
