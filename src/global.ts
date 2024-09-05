/* eslint-disable @typescript-eslint/no-explicit-any */
import { BoxProps } from '@mui/material';
import { Fragment } from 'ethers/lib/utils';
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';
import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from 'react';

export type LanguageType = 'en' | 'vi';
export type ThemeMode = 'dark' | 'light';
export type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export type ButtonHtmlProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type enqueueSnackbarFunc = (
  message: SnackbarMessage,
  options?: OptionsObject | undefined
) => SnackbarKey;

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

export interface BaseChain {
  name: string;
  isMainnet: boolean;
  translate: string;
  image: string;
  nativeCurrency: NativeToken;
}

export interface Chain extends BaseChain {
  blockExplorerUrls: Array<string>;
  urls: Array<string>;
}

export interface ChainType {
  [chain: string]: Chain;
}

// start eCharts
export type TooltipEventType = {
  dataIndex: number;
};
export type EChartEventType = {
  // type of the component to which the clicked glyph belongs
  // i.e., 'series', 'markLine', 'markPoint', 'timeLine'
  componentType: string;
  // series type (make sense when componentType is 'series')
  // i.e., 'line', 'bar', 'pie'
  seriesType: string;
  // series index in incoming option.series (make sense when componentType is 'series')
  seriesIndex: number;
  // series name (make sense when componentType is 'series')
  seriesName: string;
  // data name, category name
  name: string;
  // data index in incoming data array
  dataIndex: number;
  // incoming rwa data item
  data: unknown;
  // Some series, such as sankey or graph, maintains more than
  // one types of data (nodeData and edgeData), which can be
  // distinguished from each other by dataType with its value
  // 'node' and 'edge'.
  // On the other hand, most series has only one type of data,
  // where dataType is not needed.
  dataType: string;
  // incoming data value
  value: number | Array<any>;
  // color of component (make sense when componentType is 'series')
  color: string;
  // User info (only available in graphic component
  // and custom series, if element option has info
  // property, e.g., {type: 'circle', info: {some: 123}})
  info: unknown;
  type: string;
};
// end eCharts
