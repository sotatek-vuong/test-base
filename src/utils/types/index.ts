export interface ERC20Token {
  chainId?: number | string;
  name: string;
  address?: string;
  symbol: string;
  decimals: number;
  image?: string;
}
