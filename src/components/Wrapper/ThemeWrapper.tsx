import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { THEME_MODE } from 'src/configs/constances';
import { RootState } from 'src/reduxs/store';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    default: string;
    paper: string;
    primary: string;
    secondary: string;
  }

  interface TypeText {
    primary: string;
    secondary: string;
    disabled: string;
    header: string;
  }

  interface Palette {
    gradient: {
      main: string;
    };
  }

  interface PaletteOptions {
    gradient: {
      main: string;
    };
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xsm: true;
    xxl: true;
  }

  interface TypographyVariants {
    body3: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    gradient: true;
  }
}

declare module '@mui/material/Hidden' {
  interface HiddenProps {
    xsmDown?: boolean;
    xsmUp?: boolean;
  }
}

interface Props {
  children: ReactNode;
}

function switchTheme(mode: THEME_MODE, darkMode: string, lightMode: string) {
  if (mode === 'dark') return darkMode;
  else return lightMode;
}

const round = (value: number): number => Math.round(value * 1e5) / 1e5;
const pxToRem = (size: number): string => `${size / 16}rem`;
const buildVariant = (fontWeight: number, size: number, lineHeight: number, letterSpacing?: number) => ({
  fontWeight,
  fontSize: pxToRem(size),
  lineHeight: `${round(lineHeight / size)}`,
  ...(letterSpacing !== undefined ? { letterSpacing: `${round(letterSpacing / size)}em` } : {}),
});

export default function ThemeWrapper({ children }: Props) {
  const mode = useSelector<RootState, THEME_MODE>((state: RootState) => state.userConfigSlice.theme.mode);

  const theme = useMemo(() => {
    return createTheme({
      breakpoints: {
        keys: ['xs', 'xsm', 'sm', 'md', 'lg', 'xl', 'xxl'],
        values: { xs: 0, xsm: 600, sm: 760, md: 960, lg: 1280, xl: 1440, xxl: 1800 },
      },
      palette: {
        mode,
        background: {
          paper: switchTheme(mode, '#021C39', '#FFFFFF'),
          default: switchTheme(mode, '#031527', '#F5F7FA'),
          primary: switchTheme(mode, '#00244D', '#E6EBF4'),
          secondary: switchTheme(mode, '#07111C', '#FFFFFF'),
        },
        gradient: {
          main: 'linear-gradient(100.42deg, #2C85EE 16.07%, #4FB5FF 79.2%)',
        },
        primary: {
          main: '#1C8CF3',
          light: '#25A0E226',
        },
        secondary: {
          main: switchTheme(mode, '#7994C1', '#566474'),
          dark: switchTheme(mode, '#293C4E', '#D7DFEC'),
          light: switchTheme(mode, '#ABCAFE', '#566474'),
        },
        info: {
          main: '#1C8CF3',
        },
        success: {
          main: '#49D05A',
        },
        warning: {
          main: '#F7A813',
        },
        error: {
          main: '#EA6363',
        },
        text: {
          primary: switchTheme(mode, '#FFFFFF', '#566474'),
          secondary: switchTheme(mode, '#FFFFFF', '#131C23'),
          header: switchTheme(mode, '#FFFFFFA6', '#566474CC'),
        },
        action: {
          selected: switchTheme(mode, '#021C39', '#E6EBF4'),
          hover: switchTheme(mode, '#FFFFFF0F', '#0000000F'),
          hoverOpacity: 0.06,
        },
      },
      typography: {
        h1: buildVariant(700, 35, 41, 0.25),
        h2: buildVariant(700, 30, 35.16),
        h3: buildVariant(500, 30, 35.16),
        h4: buildVariant(700, 20, 23.44, 0.25),
        h5: buildVariant(500, 20, 23.44, 0.15),
        h6: buildVariant(400, 20, 23.44),
        body1: buildVariant(400, 16, 18.75, 0.15),
        body2: buildVariant(300, 16, 18.75, 0.15),
        body3: buildVariant(400, 14, 18.75, 0.1),
        subtitle1: buildVariant(700, 16, 18.75, 0.15),
        subtitle2: buildVariant(500, 16, 18.75, 0.15),
        button: {
          ...buildVariant(500, 14, 16.41, 0.15),
          textTransform: 'none',
        },
      },
    });
  }, [mode]);

  const baseStyle = useMemo(() => ({}), [theme]);

  return <ThemeProvider theme={responsiveFontSizes(deepmerge(theme, baseStyle))}>{children}</ThemeProvider>;
}
