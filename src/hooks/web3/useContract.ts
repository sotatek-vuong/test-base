import { generateContract } from '@/web3';
import { useState, useEffect } from 'react';
import { useAppWeb3 } from '../useAppWeb3';
import { ERC20Contract, BridgeContract } from '@/web3';
import { ethers } from 'ethers';

export function useContract<T>(abiName: string, addressOrIns?: string | T) {
  const { provider, account, chainName } = useAppWeb3();

  const [contract, setContract] = useState<T | undefined>();

  useEffect(() => {
    if (!addressOrIns) return;
    if (typeof addressOrIns === 'string') {
      generateContract<T>(abiName, addressOrIns, provider, account).then(setContract);
    } else {
      setContract(addressOrIns);
    }
  }, [abiName, addressOrIns, account, provider]);

  return contract;
}

export type AddressOrERC20 = string | ERC20Contract;
export const useERC20Contract = (address?: AddressOrERC20) =>
  useContract<ERC20Contract>('ERC20', address);

export type AddressOrBridgeContract = string | BridgeContract;
export const useBridgeContract = (address?: AddressOrBridgeContract) =>
  useContract<BridgeContract>('Bridge', address);
