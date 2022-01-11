export interface IOwnerToken {
  name: string;
  external_url: string;
  image: string;
  tokenId: string;
}

export interface IContractInfo {
  address: string;
  name: string;
  symbol: string;
  totalSupply: number;
  balance: number;
}
