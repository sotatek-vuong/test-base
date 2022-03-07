import { ethers } from 'ethers';
import type { ContractContext as ERC20Contract } from './ERC20';
import type { ContractContext as BridgeContract } from './Bridge';

export type { ERC20Contract };
export type { BridgeContract };

export async function generateContract<T = any>(
  abiName: string,
  address: string,
  provider?: ethers.providers.Web3Provider,
  signer?: string,
) {
  if (!address || !provider || !signer) return undefined;

  const abi = await import(`./${abiName}/index.json`).then((mod) => mod.default);

  if (!abi) throw new Error('Not found abi with name: ' + abiName);

  const contract = new ethers.Contract(address, abi, provider.getSigner(signer)) as unknown as T;

  return contract;
}
