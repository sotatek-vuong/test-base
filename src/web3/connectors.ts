import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
export const metamask = initializeConnector<MetaMask>(
  (actions) => new MetaMask(actions, false, { timeout: 500 }),
);
