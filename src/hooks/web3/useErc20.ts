import { ERC20, generateErc20 } from '@/web3';
import { useEffect, useState } from 'react';
import { useAppWeb3 } from '../useAppWeb3';

export type AddressOrErc20 = string | ERC20;

export const useERC20 = (token?: AddressOrErc20) => {
  const { provider, account } = useAppWeb3();

  const [erc20, setErc20] = useState<ERC20 | undefined>();

  useEffect(() => {
    if (token && typeof token === 'string') {
      const next = generateErc20(token, provider, account);
      setErc20(next);
    }
  }, [provider, token, account]);

  return erc20;
};
