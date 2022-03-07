import { BridgeContract, BSC_CHAIN_ID, CELO_CHAIN_ID, CHAINS, CHAIN_ASSETS } from '@/web3';
import { ethers, utils } from 'ethers';
import _ from 'lodash';
import { useAsync } from 'react-use';
import BridgeAbi from '@/web3/abi/Bridge/index.json';
import BigNumber from 'bignumber.js';

const generateBridgeContract = (chainId: number) => {
  const provider = new ethers.providers.JsonRpcProvider(
    _.chain(CHAINS).find({ chainId }).get('rpcUrls').first().value()!,
  );

  const contractAddress = _.chain(CHAIN_ASSETS).find({ chainId }).get('bridge').value();

  return new ethers.Contract(contractAddress, BridgeAbi, provider);
};

const contracts = {
  bsc: generateBridgeContract(BSC_CHAIN_ID),
  celo: generateBridgeContract(CELO_CHAIN_ID),
};

export const usePoA = (tokenAddress: string, chainName: string) => {
  const { value = '0', loading } = useAsync(async () => {
    if (!chainName || !tokenAddress) return;

    const contract = _.get(contracts, [chainName], null);
    if (!contract) return;

    const funds = await contract.getLockedFunds(tokenAddress);

    return utils.formatEther(funds);
  }, [tokenAddress, chainName]);

  return { value: new BigNumber(value), loading };
};
