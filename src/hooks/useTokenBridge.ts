import { BridgeFormInterface } from '@/utils';
import BigNumber from 'bignumber.js';
import { utils } from 'ethers';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useAppWeb3 } from './useAppWeb3';
import useThrowableAsyncFn from './useThrowableAsyncFn';
import { useApprove } from './web3/useApprove';
import { useBalance } from './web3/useBalance';
import { useBridgeContract, useERC20Contract } from './web3/useContract';

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

export const useBridge = (erc20Address?: string, bridgeAddress?: string) => {
  const erc20 = useERC20Contract(erc20Address);
  const { provider } = useAppWeb3();
  const { doApprove, isApproved, loading: loadingApprove } = useApprove(bridgeAddress, erc20);
  const { balance, loading: loadingBalance, decimals, refreshBalance } = useBalance(erc20);

  const bridgeContract = useBridgeContract(bridgeAddress);
  const [txHash, setTxHash] = useState<string>();

  useEffect(() => {
    if (txHash && provider) {
      provider.waitForTransaction(txHash).then(() => {
        refreshBalance();
        setTxHash(undefined);
      });
    }
  }, [txHash, provider]);

  const [{ loading: lockLoading }, lock] = useThrowableAsyncFn(
    async (data: BridgeFormInterface) => {
      if (!bridgeContract) return;

      const shouldNullAddress = _.isEmpty(data.pair?.from_address);

      const _recipient = data.dest;
      const _token = shouldNullAddress ? NULL_ADDRESS : data.pair!.from_address;
      const _amount = utils.parseUnits(data.amount, decimals);
      const _chainName = data.to;

      console.log({
        _recipient,
        _token,
        _amount,
        _chainName,
      });

      const tx = await bridgeContract.lock(_recipient, _token, _amount, _chainName, {
        value: shouldNullAddress ? _amount : undefined,
      });

      setTxHash(tx.hash);

      return tx;
    },
    [bridgeContract, decimals],
  );

  return {
    balance,
    isApproved,
    lock,
    doApprove,
    loading: {
      lock: lockLoading,
      approve: loadingApprove,
      balance: loadingBalance,
    },
  };
};
