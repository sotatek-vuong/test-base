import { ethers } from 'ethers';
import erc20ABI from './erc20.json';
import { ERC20 } from './erc20';

export const generateErc20 = (address: string, provider: ethers.providers.Web3Provider) => {
  const contract = new ethers.Contract(address, erc20ABI, provider) as ERC20;
  return contract;
};
