import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import _ from 'lodash';
import { Web3ReactHooks } from '@web3-react/core';
import { hasMetamask } from '@/utils/helpers';
import { CHAIN_IDS, getAddChainParameters, metamask } from '@/web3';
import {
  ConnectDialog,
  ConnectDialogRefProps,
  ExtensionDialog,
  NetworkDialogRefProps,
  PromptNetworkDialog,
} from '@/components/index';

interface AppWeb3ContextInterface extends ReturnType<Web3ReactHooks['useWeb3React']> {
  connect: () => Promise<any>;
  disconnect: (...args: any[]) => any;
  changeChain: () => Promise<any>;
  unsupportedChainId: boolean;
  isActivating: boolean;
}

const AppWeb3Context = createContext<AppWeb3ContextInterface | null>(null);

export const useAppWeb3 = () => useContext(AppWeb3Context)!;

const getConnector = () => {
  if (hasMetamask()) {
    return metamask;
  }

  return [];
};

export const AppWeb3Provider: React.FC = ({ children }) => {
  const [openInstallHelper, setOpenInstallHelper] = React.useState(false);
  const networkRef = useRef<NetworkDialogRefProps>();
  const connectRef = useRef<ConnectDialogRefProps>();

  const [_connector, hooks] = useMemo(() => getConnector(), []);

  const { useProvider, useIsActivating, useWeb3React } = hooks || {};

  const provider = useProvider?.();
  const isActivating = useIsActivating?.();

  const web3React = useWeb3React?.(provider) || {};
  const { connector, chainId } = web3React;

  useEffect(() => {
    connector?.connectEagerly?.();
  }, [connector]);

  const addChain = useCallback(
    async (chainId) => {
      if (!connector?.provider) return;

      if (!CHAIN_IDS.includes(chainId)) return;

      try {
        await connector.provider.request({
          method: 'wallet_addEthereumChain',
          params: [getAddChainParameters(chainId)],
        });
      } catch (err) {
        console.log(err);
      }
    },
    [connector?.provider],
  );

  const activateChain = useCallback(
    async (nextChainId) => {
      if (!hasMetamask()) {
        return setOpenInstallHelper(true);
      }
      if (!CHAIN_IDS.includes(nextChainId)) return;

      try {
        await addChain(nextChainId);
        await connector.activate(nextChainId);
      } catch (err) {
        console.log({ err });
      }
    },
    [connector, addChain],
  );
  const unsupportedChainId = Boolean(chainId) && !CHAIN_IDS.includes(chainId!);

  const changeChain = useCallback(async () => {
    const nextId = await networkRef.current?.userSelectNetwork();

    if (nextId) {
      await activateChain(nextId);
    }
  }, [networkRef.current, activateChain]);

  const connect = useCallback(async () => {
    const data = await connectRef.current?.userSelectWallet();

    await activateChain(data?.chainId);
  }, [connectRef.current]);

  const disconnect = () => _connector?.deactivate(_connector);

  return (
    <AppWeb3Context.Provider
      value={{ ...web3React, isActivating, unsupportedChainId, connect, disconnect, changeChain }}>
      {children}
      <ExtensionDialog open={openInstallHelper} onClose={() => setOpenInstallHelper(false)} />
      <PromptNetworkDialog ref={networkRef} defaultChainId={chainId} />
      <ConnectDialog ref={connectRef} />
    </AppWeb3Context.Provider>
  );
};
