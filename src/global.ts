import { SvgIconComponent } from '@mui/icons-material';
import { BigNumberish, Fragment } from 'ethers';
import { ButtonHTMLAttributes, ComponentProps, DetailedHTMLProps } from 'react';
import { SvgComponent } from './components/Icons';

export type DivProps = ComponentProps<'div'>;
export type StringListType<T = unknown> = { [key: string]: T };

export type ButtonColorfulType = 'purple' | 'gray' | 'orange';
export type AppFetchStatus = 'initial' | 'execute' | 'pending' | 'success' | 'fail';
export type HexType = 'normal' | 'hex';
export type LanguageType = 'en' | 'vi';
export type ThemeMode = 'dark' | 'light';
export type ConnectorType = 'metamask' | 'coinbase';
export type ButtonHtmlProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export interface TimeType {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export type JubProofType = { A: bigint[]; R8: bigint[]; S: bigint[]; msg: bigint[] };

export type ProofPoint = [BigNumberish, BigNumberish];

export interface ProofCallDataType {
  pA: ProofPoint;
  pB: [ProofPoint, ProofPoint];
  pC: ProofPoint;
  pubSignals: ProofPoint;
}

export interface EtherFragment extends Fragment {
  stateMutability: string;
}

export interface AnimationComponentProps {
  size?: number | string;
  color?: string;
}

export interface AnimationComponentDivProps<T = AnimationComponentProps> extends DivProps {
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

export type AppReferenceItemType = {
  id: string;
  title: string;
  link: string;
  description: string;
  icon: SvgIconComponent | SvgComponent;
};

export type AppReferenceId = 'component' | 'chart' | 'web3' | 'encryption' | 'academy';

export type AppReferenceType = {
  id: AppReferenceId;
  title: string;
  link?: string;
  icon?: SvgIconComponent;
  items?: Array<AppReferenceItemType>;
};

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
