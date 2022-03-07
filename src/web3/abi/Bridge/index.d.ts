import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  Index,
  IndexMethodNames,
  IndexEventsContext,
  IndexEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type IndexEvents =
  | 'LogAddValidator'
  | 'LogChangeOperator'
  | 'LogLock'
  | 'LogRefund'
  | 'LogRemoveValidator'
  | 'LogUnlock'
  | 'LogUnlockFee'
  | 'OwnershipTransferred'
  | 'Paused'
  | 'Unpaused';
export interface IndexEventsContext {
  LogAddValidator(...parameters: any): EventFilter;
  LogChangeOperator(...parameters: any): EventFilter;
  LogLock(...parameters: any): EventFilter;
  LogRefund(...parameters: any): EventFilter;
  LogRemoveValidator(...parameters: any): EventFilter;
  LogUnlock(...parameters: any): EventFilter;
  LogUnlockFee(...parameters: any): EventFilter;
  OwnershipTransferred(...parameters: any): EventFilter;
  Paused(...parameters: any): EventFilter;
  Unpaused(...parameters: any): EventFilter;
}
export type IndexMethodNames =
  | 'addValidator'
  | 'changeOperator'
  | 'checkIsUnlocked'
  | 'emergencyWithdraw'
  | 'getLockData'
  | 'getLockedFunds'
  | 'getValidators'
  | 'initialize'
  | 'lock'
  | 'lockBurnNonce'
  | 'operator'
  | 'owner'
  | 'pause'
  | 'paused'
  | 'refund'
  | 'removeValidator'
  | 'renounceOwnership'
  | 'timeLockContract'
  | 'transferOwnership'
  | 'unlock'
  | 'unpause';
export interface LogAddValidatorEventEmittedResponse {
  _validator: string;
}
export interface LogChangeOperatorEventEmittedResponse {
  _oldOperator: string;
  _newOperator: string;
}
export interface LogLockEventEmittedResponse {
  _from: string;
  _to: string;
  _token: string;
  _symbol: string;
  _value: BigNumberish;
  _nonce: BigNumberish;
  _chainName: string;
}
export interface LogRefundEventEmittedResponse {
  _to: string;
  _token: string;
  _symbol: string;
  _value: BigNumberish;
  _nonce: BigNumberish;
}
export interface LogRemoveValidatorEventEmittedResponse {
  _validator: string;
}
export interface LogUnlockEventEmittedResponse {
  _to: string;
  _token: string;
  _symbol: string;
  _value: BigNumberish;
  _interchainTX: Arrayish;
}
export interface LogUnlockFeeEventEmittedResponse {
  _owner: string;
  _token: string;
  _symbol: string;
  _fee: BigNumberish;
  _interchainTX: Arrayish;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface PausedEventEmittedResponse {
  account: string;
}
export interface UnpausedEventEmittedResponse {
  account: string;
}
export interface GetLockDataResponse {
  result0: boolean;
  0: boolean;
  result1: BigNumber;
  1: BigNumber;
  result2: string;
  2: string;
  result3: string;
  3: string;
  result4: BigNumber;
  4: BigNumber;
  result5: string;
  5: string;
  length: 6;
}
export interface Index {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _newValidator Type: address, Indexed: false
   */
  addValidator(
    _newValidator: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _newOperator Type: address, Indexed: false
   */
  changeOperator(
    _newOperator: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _interchainTX Type: bytes32, Indexed: false
   */
  checkIsUnlocked(_interchainTX: Arrayish, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param sigV Type: uint8[], Indexed: false
   * @param sigR Type: bytes32[], Indexed: false
   * @param sigS Type: bytes32[], Indexed: false
   * @param tokenAddress Type: address, Indexed: false
   * @param _amount Type: uint256, Indexed: false
   */
  emergencyWithdraw(
    sigV: BigNumberish[],
    sigR: Arrayish[],
    sigS: Arrayish[],
    tokenAddress: string,
    _amount: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _nonce Type: uint256, Indexed: false
   */
  getLockData(
    _nonce: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<GetLockDataResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _token Type: address, Indexed: false
   */
  getLockedFunds(_token: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getValidators(overrides?: ContractCallOverrides): Promise<string[]>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _operatorAddress Type: address, Indexed: false
   * @param _timeLockAddress Type: address, Indexed: false
   * @param _validator Type: address, Indexed: false
   */
  initialize(
    _operatorAddress: string,
    _timeLockAddress: string,
    _validator: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _recipient Type: address, Indexed: false
   * @param _token Type: address, Indexed: false
   * @param _amount Type: uint256, Indexed: false
   * @param _chainName Type: string, Indexed: false
   */
  lock(
    _recipient: string,
    _token: string,
    _amount: BigNumberish,
    _chainName: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  lockBurnNonce(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  operator(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  pause(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  paused(overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param sigV Type: uint8[], Indexed: false
   * @param sigR Type: bytes32[], Indexed: false
   * @param sigS Type: bytes32[], Indexed: false
   * @param _recipient Type: address, Indexed: false
   * @param _tokenAddress Type: address, Indexed: false
   * @param _symbol Type: string, Indexed: false
   * @param _amount Type: uint256, Indexed: false
   * @param _nonce Type: uint256, Indexed: false
   */
  refund(
    sigV: BigNumberish[],
    sigR: Arrayish[],
    sigS: Arrayish[],
    _recipient: string,
    _tokenAddress: string,
    _symbol: string,
    _amount: BigNumberish,
    _nonce: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _validator Type: address, Indexed: false
   */
  removeValidator(
    _validator: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  renounceOwnership(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  timeLockContract(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newOwner Type: address, Indexed: false
   */
  transferOwnership(
    newOwner: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param sigV Type: uint8[], Indexed: false
   * @param sigR Type: bytes32[], Indexed: false
   * @param sigS Type: bytes32[], Indexed: false
   * @param _recipient Type: address, Indexed: false
   * @param tokenAddress Type: address, Indexed: false
   * @param _symbol Type: string, Indexed: false
   * @param _amount Type: uint256, Indexed: false
   * @param _fee Type: uint256, Indexed: false
   * @param _interchainTX Type: bytes32, Indexed: false
   */
  unlock(
    sigV: BigNumberish[],
    sigR: Arrayish[],
    sigS: Arrayish[],
    _recipient: string,
    tokenAddress: string,
    _symbol: string,
    _amount: BigNumberish,
    _fee: BigNumberish,
    _interchainTX: Arrayish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  unpause(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
}
