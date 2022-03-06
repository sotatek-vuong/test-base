import BigNumber from 'bignumber.js';
import { utils } from 'ethers';
import { useAsync } from 'react-use';
import { useAppWeb3 } from '../useAppWeb3';
import { AddressOrErc20, useERC20 } from './useErc20';

// if native, pass undefined as parameter
export const useBalance = (token?: AddressOrErc20) => {
  const { provider, account } = useAppWeb3();

  const erc20 = useERC20(token);

  const { value = '0', loading } = useAsync(async () => {
    if (!account || !provider) return;

    let wei;
    if (!erc20) {
      wei = await provider.getBalance(account);
    } else {
      wei = await erc20.balanceOf(account);
    }

    return utils.formatEther(wei);
  }, [account, erc20]);

  return { balance: new BigNumber(value), loading };
};
