/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputEntryFunctionData, InputViewFunctionData } from '@aptos-labs/ts-sdk';
import { BoxProps } from '@mui/material';
import { Fragment } from 'ethers';
import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from 'react';

export type StringListType<T = unknown> = { [key: string]: T };

export type LanguageType = 'en' | 'vi';
export type ThemeMode = 'dark' | 'light';
export type ConnectorType = 'metamask' | 'coinbase';
export type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export type ButtonHtmlProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export interface EtherFragment extends Fragment {
  stateMutability: string;
}

export interface AnimationComponentProps {
  size?: number | string;
  color?: string;
}

export interface AnimationComponentBoxProps<T = AnimationComponentProps> extends BoxProps {
  iconProps?: T;
}

export interface NativeToken {
  name: string;
  symbol: string;
  decimals: number;
}

export interface Connector {
  image: string;
  type: ConnectorType;
  name: string;
}
export type ConnectorListType = {
  [id in ConnectorType]: Connector;
};

export type Chain = {
  name: string;
  nativeCurrency: NativeToken;
  chainId: number;
  image: string;
  explorers: Array<string>;
  urls: Array<string>;
  isMainnet: boolean;
};

export type ChainList = StringListType<Chain>;

// start eCharts
export type TooltipParamType = {
  componentType: 'series';
  // Series type
  seriesType: string;
  // Series index in option.series
  seriesIndex: number;
  // Series name
  seriesName: string;
  // Data name, or category name
  name: string;
  // Data index in input data array
  dataIndex: number;
  // Original data as input
  data: [number, number];
  // data dimension index, for example 0 or 1 or 2 ...
  // Only work in `radar` series.
  dimensionIndex: number;
  // Color of data
  color: string;
  // The percentage of current data item in the pie/funnel series
  percent: number;
};

export type KeyEChartType =
  | 'stakers'
  | 'newStakers'
  | 'aptStaked'
  | 'averageStakedAmt'
  | 'medianStakedAmt'
  | 'top1Percent'
  | 'top10Percent';

export type DashboardLineConfigType = {
  [key in KeyEChartType]: {
    id: KeyEChartType;
    title: string;
    colorIndex: number;
    position: 'left' | 'right';
    type: 'line' | 'bar';
  };
};

export type DashboardCoreDataType = {
  [key in KeyEChartType]: number;
};

export type DashboardGlobalDataType = {
  [key in KeyEChartType]: Array<[number, number]>;
};

export type DashboardLegendType = {
  [key in KeyEChartType]: boolean;
};
// end eCharts

// start Aptos types
export type TaskType = {
  address: string;
  completed: boolean;
  content: string;
  task_id: number;
};
export type TasksListType = { [taskId: string]: TaskType };
export type AptosMoveIdType = {
  packageName: string;
  module: string;
  functionName: string;
};
export type AptosViewDataType = Omit<InputViewFunctionData, 'function'> & AptosMoveIdType;
export type AptosRunDataType = Omit<InputEntryFunctionData, 'function'> & AptosMoveIdType;
// end Aptos types
