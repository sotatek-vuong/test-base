import { useApprove } from './web3/useApprove';
import { useBalance } from './web3/useBalance';
import { useERC20 } from './web3/useErc20';

export const useBridge = (token?: string, spender?: string) => {
  const erc20 = useERC20(token);

  const { doApprove, isApproved, loading: loadingApprove } = useApprove(spender, erc20);
  const { balance, loading: loadingBalance } = useBalance(erc20);

  return {
    balance,
    doApprove,
    isApproved,
    loading: {
      approve: loadingApprove,
      balance: loadingBalance,
    },
  };
};
