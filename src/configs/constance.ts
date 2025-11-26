import BSC from 'src/assets/images/BSC.svg';
import { DataItem } from 'src/global';

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

export const CARD_WIDTH = 280;
export const CARD_GAP = 32;
export const SCROLL_SPEED = 1.5; // Pixels per frame

export const MOCK_DATA: DataItem[] = [
  {
    id: 'u_001',
    title: 'Sarah Connor',
    role: 'System Architect',
    imageUrl: 'https://picsum.photos/400/400?random=1',
    clearanceLevel: 5,
  },
  {
    id: 'u_002',
    title: 'John Anderson',
    role: 'Software Engineer',
    imageUrl: 'https://picsum.photos/400/400?random=2',
    clearanceLevel: 3,
  },
  {
    id: 'f_003',
    title: 'Project Bluebook',
    role: 'Classified Document',
    imageUrl: 'https://picsum.photos/400/400?random=3',
    clearanceLevel: 9,
  },
  {
    id: 'u_004',
    title: 'Elliot Alderson',
    role: 'Cybersecurity Analyst',
    imageUrl: 'https://picsum.photos/400/400?random=4',
    clearanceLevel: 4,
  },
  {
    id: 'd_005',
    title: 'Network Schema',
    role: 'Technical Diagram',
    imageUrl: 'https://picsum.photos/400/400?random=5',
    clearanceLevel: 2,
  },
  {
    id: 'u_006',
    title: 'Trinity',
    role: 'Operator',
    imageUrl: 'https://picsum.photos/400/400?random=6',
    clearanceLevel: 8,
  },
  {
    id: 'f_007',
    title: 'Payload.exe',
    role: 'Executable',
    imageUrl: 'https://picsum.photos/400/400?random=7',
    clearanceLevel: 10,
  },
];

export const ENCRYPTION_CHARS = '01010101@#$%&[]{}<>/\\|;:';
