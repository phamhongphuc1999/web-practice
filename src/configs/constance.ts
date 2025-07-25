import BSC from 'src/assets/images/BSC.svg';

export const LS = {
  THEME: 'theme',
  LANGUAGE: 'la',
  CONNECTOR: 'connector',
  CHAIN_ID: 'chain_id',
  ACCESS_TOKEN: 'accessToken',
  TOKEN_EXPIRE: 'tokenExpire',
};

export const WALLET_LS = {
  SEED: 'seed',
  PASSWORD: 'password',
  STATUS: 'status',
  CHAIN_ID: 'wallet_chain_id',
  TOKEN: 'wallet_token',
};

export const ChainConfig = [
  { chainId: 56, image: BSC, name: 'BSC Mainnet' },
  { chainId: 97, image: BSC, name: 'BSC Testnet' },
];

export const languageConfig = {
  en: { id: 'en', label: 'english' },
  vi: { id: 'vi', label: 'vietnamese' },
};

export const MILLISECOND = 1;
export const SECOND = MILLISECOND * 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export const color1 = '#335cd7';
export const color2 = '#19ab17';
export const color3 = '#f150f4';
export const color4 = '#b4b625';
export const color5 = '#da1f73';
export const color6 = '#fa4646';
export const color7 = '#46faf2';
export const color8 = '#7700ff';

export const COLOR_ARRAY = [color1, color2, color3, color4, color5, color6, color7, color8];

export const STORAGE_BASE_URL = 'http://localhost:9090';
