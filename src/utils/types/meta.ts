export interface ObjWithId {
  __v: number;
  _id: string;
}

export interface Coin extends ObjWithId {
  name: string;
  symbol: string;
  url: string;
}

export interface TokenPair extends ObjWithId {
  min_amount: number;
  max_amount: number;
  from_address: string;
  to_address: string;
  from_chain: string;
  from_symbol: string;
  to_chain: string;
  to_symbol: string;
}

export interface ChainInfo {
  chainName: string;
  chainId: number;
  txt: string;
  shortTxt: string;
  icon: string;
  bridge: string;
}
