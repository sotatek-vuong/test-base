import { TokenPair } from './meta';

export interface BridgeFormInterface {
  from: string;
  to: string;
  dest: string;
  pair: TokenPair | null;
  amount: string;
}
