export type FragmentType = 'function' | 'event' | 'constructor' | 'error';

export type ParamType = {
  name: string;
  type: string;
  baseType?: string;
  indexed?: boolean;
  arrayChildren?: ParamType;
  arrayLength?: number;
  components?: Array<ParamType>;
};

export type BaseFragment = {
  name: 'string';
  type: FragmentType;
  inputs: Array<ParamType>;
};

export type ConstructorFragment = BaseFragment & {
  type: 'constructor';
  payable?: boolean;
  stateMutability: string;
};

export type FunctionFragment = BaseFragment & {
  type: 'function';
  constant?: boolean;
  stateMutability: string;
  outputs: Array<ParamType>;
};

export type EventFragment = BaseFragment & {
  type: 'event';
  anonymous: boolean;
};

export type ErrorFragment = BaseFragment & {
  type: 'error';
};

export type JsonContractAbi = {
  constructor?: ConstructorFragment;
  functions: Array<FunctionFragment>;
  events: Array<EventFragment>;
  errors: Array<ErrorFragment>;
};
