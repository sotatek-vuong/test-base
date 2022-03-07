import { useAsync } from 'react-use';
import { useAppWeb3 } from '../useAppWeb3';
import useThrowableAsyncFn from '../useThrowableAsyncFn';
import { AddressOrERC20, useERC20Contract } from './useContract';

export const useApprove = (spender?: string, token?: AddressOrERC20) => {
  const { provider, account } = useAppWeb3();

  const erc20 = useERC20Contract(token);

  const { value: isApproved, loading: loadingIsApproved } = useAsync(async () => {
    if (!spender || !account || !erc20) return;

    const allowed = await erc20.allowance(account, spender);

    return allowed.gt(0);
  }, [spender, account, erc20]);

  const [{ loading: loadingApprove }, doApprove] = useThrowableAsyncFn(
    async (amountInWei?: string) => {
      if (!provider || !spender || !erc20) return;

      const _amount = amountInWei ?? (await erc20.totalSupply());
      const tx = await erc20.approve(spender, _amount);

      await provider.waitForTransaction(tx.hash);

      return true;
    },
    [provider, erc20],
  );

  return {
    loading: loadingIsApproved || loadingApprove,
    isApproved,
    doApprove,
  };
};
