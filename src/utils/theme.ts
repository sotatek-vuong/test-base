import { createTheme } from '@mui/material/styles';
import { Shadows } from '@mui/material/styles/shadows';

export const custom = {
  success: '#3CC480',
  error: '#E57373',
  warning: '#F0B90B',
  white: '#FFFFFF',
  black: '#000000',
  grey: {
    '50': '#F7FCFB',
    '100': '#E6EBEA',
    '200': '#D4D9D8',
    '300': '#C3C7C6',
    '400': '#B1B5B4',
    '700': '#7E807F',
    '800': '#4B4D4C',
    '900': '#1A1A1A',
  },
  primary: '#6EC5B2',
  secondary: '#183748',
  background: '#F8FAFC',
};

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['grey'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['grey'];
  }
}

declare module '@mui/material/Button' {
  export interface ButtonPropsColorOverrides {
    neutral: any;
  }
}

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: custom.white,
      default: custom.background,
    },
    primary: { main: custom.primary, contrastText: '#fff' },
    secondary: { main: custom.secondary },
    neutral: custom.grey,
    grey: custom.grey,
    success: { main: custom.success },
    warning: { main: custom.warning },
    error: { main: custom.error, contrastText: '#fff' },
    divider: custom.grey[100],
    action: { hover: custom.grey[100], hoverOpacity: 0.2 },
  },

  typography: {
    fontFamily: 'Space Grotesk',

    h1: { fontSize: 36, lineHeight: '40px' },
    h2: { fontSize: 30, lineHeight: '36px' },
    h3: { fontSize: 20, lineHeight: '28px' },
    h4: { fontSize: 18, lineHeight: '24px' },
    h5: { fontSize: 16, lineHeight: '24px' },
    h6: { fontSize: 14, lineHeight: '24px' },

    body1: { fontSize: 16 },
    body2: { fontSize: 14 },

    allVariants: { fontWeight: 500, color: custom.black, lineHeight: 1.5 },
  },
  breakpoints: {
    values: (() => {
      // affects to `Dialog` and `Container`
      // this is the padding of the `Container`
      // you can override later in `sx` props
      const paddingLeft = 24;
      const paddingRight = 24;
      const padding = paddingLeft + paddingRight;
      return {
        xs: 0,
        sm: 420 + padding,
        md: 560 + padding,
        lg: 1130 + padding,
        xl: 1440 + padding,
      };
    })(),
  },
  shape: {
    borderRadius: 16,
  },
  spacing: 8,

  components: {
    MuiCssBaseline: { styleOverrides: { boxSizing: 'border-box' } },
    MuiAppBar: {
      defaultProps: { color: 'transparent' },
    },
    MuiInputAdornment: {
      styleOverrides: {
        positionStart: { marginRight: 16 },
        positionEnd: { marginLeft: 16 },
      },
    },
    MuiContainer: {
      defaultProps: { maxWidth: 'lg' },
    },
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
    },

    MuiButton: {
      defaultProps: { variant: 'contained', color: 'primary', size: 'large' },
      styleOverrides: {
        root: {
          fontSize: 20,
          lineHeight: '28px',
          borderRadius: 24,
          textTransform: 'none',
        },
        sizeLarge: {
          padding: '11px 19px',
          height: 52,
        },
        sizeSmall: {
          padding: '5px 15px',
          height: 40,
          borderRadius: '4px',
        },
        outlinedSecondary: {
          borderColor: custom.secondary,
        },
      },
    },
    MuiListItemText: { defaultProps: { disableTypography: true } },
    MuiLink: {
      defaultProps: { underline: 'hover' },
      styleOverrides: { underlineHover: { cursor: 'pointer' } },
    },
    MuiAutocomplete: {
      defaultProps: {
        autoComplete: true,
        includeInputInList: true,
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': { borderBottom: 0 },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: '4px' },
        outlinedSuccess: {
          backgroundColor: custom.grey[50],
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: { color: custom.grey[800] },
      },
    },
  },
  shadows: Array(25).fill('none') as Shadows,
});
