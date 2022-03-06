import { ethers } from 'ethers';
import erc20ABI from './ERC20.json';
import { ContractContext as ERC20 } from './ERC20';

export type { ERC20 };

export const generateErc20 = (
  address: string,
  provider?: ethers.providers.Web3Provider,
  signer?: string,
) => {
  if (!address || !provider || !signer) return undefined;

  const contract = new ethers.Contract(
    address,
    erc20ABI,
    provider.getSigner(signer),
  ) as unknown as ERC20;

  return contract;
};
