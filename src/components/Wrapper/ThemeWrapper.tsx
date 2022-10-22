import { createTheme, darken, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { THEME_MODE } from 'src/configs/constance';
import { RootState } from 'src/redux/store';

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

  const baseStyle = useMemo(
    () => ({
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            '.SnackbarItem-wrappedRoot .SnackbarItem-contentRoot .SnackbarItem-message': {
              ...theme.typography.body3,
            },
            // disable arrow from input number
            // Chrome, Safari, Edge, Opera
            'input::-webkit-outer-spin-button,input::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: 0,
            },
            // Firefox
            'input[type=number]': {
              MozAppearance: 'textfield',
            },
          },
        },
        MuiBackdrop: {
          styleOverrides: {
            root: {
              backdropFilter: 'blur(3px)',
            },
          },
        },
        MuiButton: {
          defaultProps: {
            disableElevation: true,
          },
          styleOverrides: {
            root: {
              textTransform: 'capitalize',
              borderRadius: 6,
            },
            sizeMedium: {
              ...theme.typography.button,
              lineHeight: 1,
              padding: '8px 16px',
            },
            sizeLarge: {
              padding: '10px 22px',
            },
            sizeSmall: {
              padding: '4px 10px',
            },
            containedSecondary: {
              backgroundColor: theme.palette.secondary.dark,
              color: theme.palette.mode === 'dark' ? '#949EA6' : '#566474',
              '&:hover, &.Mui-focusVisible': {
                backgroundColor: darken(theme.palette.secondary.dark, 0.2),
              },
            },
          },
          variants: [
            {
              props: { variant: 'gradient' },
              style: {
                color: theme.palette.common.white,
                background: theme.palette.gradient.main,
                transition: 'all 250ms ease',
                '&:hover, &.Mui-focusVisible': {
                  opacity: 0.9,
                },
              },
            },
          ],
        },
        MuiTypography: {
          defaultProps: {
            variant: 'body1',
            variantMapping: {
              h1: 'h1',
              h2: 'h2',
              h3: 'h3',
              h4: 'h4',
              h5: 'p',
              h6: 'p',
              body1: 'p',
              body2: 'p',
              body3: 'p',
              subtitle1: 'p',
              subtitle2: 'p',
              button: 'p',
            },
          },
        },
        MuiSvgIcon: {
          styleOverrides: {
            root: {
              fontSize: pxToRem(20),
            },
            fontSizeSmall: {
              fontSize: pxToRem(16),
            },
            fontSizeLarge: {
              fontSize: pxToRem(24),
            },
          },
        },
        MuiPaper: {
          defaultProps: {
            elevation: 0,
          },
          styleOverrides: {
            root: {
              borderRadius: 6,
            },
          },
        },
        MuiTableContainer: {
          styleOverrides: {
            root: {
              borderRadius: 10,
            },
          },
        },
        MuiDialog: {
          defaultProps: {
            scroll: 'body',
            PaperProps: {
              elevation: 0,
            },
          },
        },
        MuiDialogContent: {
          styleOverrides: {
            root: {
              padding: theme.spacing(2.5),
            },
          },
        },
        MuiDialogTitle: {
          styleOverrides: {
            root: {
              padding: theme.spacing(2, 2.5),
              backgroundColor: theme.palette.background.primary,
              '&.MuiDialogTitle-root+.MuiDialogContent-root': {
                paddingTop: theme.spacing(2.5),
              },
            },
          },
        },
        MuiUseMediaQuery: {
          defaultProps: {
            noSsr: true,
          },
        },
        MuiTooltip: {
          defaultProps: {
            arrow: true,
            placement: 'top',
          },
          styleOverrides: {
            tooltip: {
              ...theme.typography.body3,
              boxShadow:
                theme.palette.mode === 'light'
                  ? 'rgb(0 0 0 / 20%) 0px 0px 2px, rgb(0 0 0 / 10%) 0px 2px 10px'
                  : 'rgb(255 255 255 / 20%) 0px 0px 2px, rgb(185 185 185 / 10%) 0px 2px 10px',
              backgroundColor: theme.palette.background.default,
              padding: theme.spacing(1.5, 2),
              maxWidth: 400,
              color: theme.palette.mode === 'dark' ? '#fff' : '#000',
            },
            arrow: {
              '&:before': {
                boxShadow:
                  theme.palette.mode === 'light'
                    ? 'rgb(0 0 0 / 20%) 0px 0px 2px, rgb(0 0 0 / 10%) 0px 2px 10px'
                    : 'rgb(255 255 255 / 20%) 0px 0px 2px, rgb(185 185 185 / 10%) 0px 2px 10px',
              },
              color: theme.palette.background.default,
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              borderRadius: 10,
              '&:not(.Mui-focused):hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.dark,
                borderWidth: 2,
              },
            },
            focused: {
              '& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            },
            input: {
              // padding: theme.spacing(1.5, 2),
            },
            notchedOutline: {
              borderColor: theme.palette.secondary.dark,
            },
          },
        },
        MuiAccordion: {
          styleOverrides: {
            root: {
              overflow: 'hidden',
              borderRadius: 6,
              '&:first-of-type': {
                borderRadius: 6,
              },
              '&:before': {
                display: 'none',
              },
              '&.Mui-expanded': {
                backgroundColor: theme.palette.background.secondary,
              },
            },
          },
        },
        MuiAccordionSummary: {
          styleOverrides: {
            root: {
              padding: theme.spacing(1, 2.5),
              '&.Mui-expanded': {
                backgroundColor: theme.palette.action.selected,
              },
            },
          },
        },
        MuiAccordionDetails: {
          styleOverrides: {
            root: {
              padding: theme.spacing(3, 2.5),
            },
          },
        },
        MuiButtonGroup: {
          styleOverrides: {
            grouped: {
              '&:not(:last-of-type)': {
                borderTopRightRadius: 6,
                borderBottomRightRadius: 6,
                borderRightColor: 'inherit',
              },
              '&:not(:first-of-type)': {
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
              },
            },
          },
        },
        MuiPopover: {
          styleOverrides: {
            root: {
              '& .MuiBackdrop-root': {
                backdropFilter: 'none',
              },
            },
          },
        },
        MuiPagination: {
          defaultProps: {
            color: 'primary',
            shape: 'rounded',
          },
        },
        MuiPaginationItem: {
          styleOverrides: {
            root: {
              '&.Mui-selected': {
                boxShadow: '0px 0px 10px 1px rgba(196, 196, 196, 0.5)',
              },
            },
            text: {
              fontWeight: 400,
            },
          },
        },
      },
    }),
    [theme]
  );

  return <ThemeProvider theme={responsiveFontSizes(deepmerge(theme, baseStyle))}>{children}</ThemeProvider>;
}
