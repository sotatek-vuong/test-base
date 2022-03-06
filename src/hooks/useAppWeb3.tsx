import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import _ from 'lodash';
import { getPriorityConnector } from '@web3-react/core';
import { hasMetamask, isClient } from '@/utils';
import { ChainIdToChainName, getAddChainParameters, getChainIdByName, metamask } from '@/web3';
import {
  ConnectDialog,
  ConnectPromptFn,
  ExtensionDialog,
  NetworkPromptFn,
  PromptNetworkDialog,
} from '@/components';
import { ethers } from 'ethers';
import { Connector } from '@web3-react/types';

interface AddTokenParams {
  address: string;
  symbol: string;
  decimals: number;
  image?: string;
}

interface AppWeb3ContextInterface {
  connect: () => Promise<any>;
  disconnect: (...args: any[]) => any;
  changeChain: () => Promise<any>;
  addToken: (token: AddTokenParams, type?: string) => Promise<any>;
  chainName?: string;
  connector?: Connector;
  provider?: ethers.providers.Web3Provider;
  account?: string;
  chainId?: number;
  isActive: boolean;
  error?: Error;
  isActivating: boolean;
}

const AppWeb3Context = createContext<AppWeb3ContextInterface | null>(null);

export const useAppWeb3 = () => useContext(AppWeb3Context)!;

const getConnector = (): ReturnType<typeof getPriorityConnector> => {
  if (isClient()) {
    return getPriorityConnector([metamask[0], metamask[1]]);
  }
  // @ts-ignore
  return [];
};

export const AppWeb3Provider: React.FC = ({ children }) => {
  const [openInstallHelper, setOpenInstallHelper] = React.useState(false);
  const networkRef = useRef<NetworkPromptFn>();
  const connectRef = useRef<ConnectPromptFn>();

  const {
    usePriorityConnector,
    usePriorityProvider,
    usePriorityAccount,
    usePriorityChainId,
    usePriorityIsActive,
    usePriorityIsActivating,
    usePriorityError,
  } = useMemo(getConnector, []);
  const chainId = usePriorityChainId?.();

  const connector = usePriorityConnector?.();
  const provider = usePriorityProvider?.(chainId);
  const account = usePriorityAccount?.();
  const isActive = usePriorityIsActive?.();
  const isActivating = usePriorityIsActivating?.();
  const error = usePriorityError?.();

  const chainName = chainId ? ChainIdToChainName[chainId] : undefined;

  useEffect(() => {
    if (connector) {
      connector!.connectEagerly!();
    }
  }, [Boolean(connector)]);

  const addChain = useCallback(
    async (_chainName?: string) => {
      const _chainId = getChainIdByName(_chainName);
      if (_chainId === -1) return;

      try {
        await provider?.send('wallet_addEthereumChain', [getAddChainParameters(_chainId)]);
      } catch (err) {
        console.log(err);
      }
    },
    [provider],
  );

  const addToken = useCallback(
    async (token: AddTokenParams, type = 'ERC20') => {
      try {
        // @ts-ignore
        await provider?.send('wallet_watchAsset', { type, options: token });
      } catch (err) {
        console.log(err);
      }
    },
    [provider],
  );

  const activateChain = useCallback(
    async (_chainName?: string) => {
      if (!hasMetamask()) {
        return setOpenInstallHelper(true);
      }
      if (getChainIdByName(_chainName) === -1) return;

      try {
        await addChain(_chainName);
        await connector?.activate(_chainName);
      } catch (err) {
        console.log({ err });
      }
    },
    [connector, addChain],
  );

  const changeChain = useCallback(async () => {
    const _chainName = await networkRef.current?.prompt();

    if (_chainName) {
      await activateChain(_chainName);
    }
  }, [activateChain]);

  const connect = useCallback(async () => {
    const data = await connectRef.current?.prompt();

    await activateChain(data?.chainName);
  }, [activateChain]);

  const disconnect = () => connector?.deactivate();

  return (
    <AppWeb3Context.Provider
      value={{
        connector,
        provider,
        account,
        chainId,
        isActive,
        isActivating,
        error,
        chainName,
        connect,
        disconnect,
        changeChain,
        addToken,
      }}>
      {children}
      <ExtensionDialog open={openInstallHelper} onClose={() => setOpenInstallHelper(false)} />
      <PromptNetworkDialog ref={networkRef} defaultChain={chainName} />
      <ConnectDialog ref={connectRef} />
    </AppWeb3Context.Provider>
  );
};
