import { alpha, createTheme } from '@mui/material/styles';

const shellBackground = '#fbfbfa';
const surfaceBackground = '#ffffff';
const ink = '#111111';
const mutedInk = '#787774';
const accent = '#1f1f1f';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: accent,
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6f6f68',
    },
    background: {
      default: shellBackground,
      paper: surfaceBackground,
    },
    error: {
      main: '#a24f4a',
    },
    success: {
      main: '#55705d',
    },
    warning: {
      main: '#9d7a45',
    },
    info: {
      main: '#57718a',
    },
    text: {
      primary: ink,
      secondary: mutedInk,
    },
    divider: alpha(ink, 0.12),
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Segoe UI", Arial, sans-serif',
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    h1: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontWeight: 700,
      letterSpacing: '-0.04em',
      lineHeight: 1.05,
    },
    h2: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontWeight: 700,
      letterSpacing: '-0.035em',
      lineHeight: 1.08,
    },
    h3: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontWeight: 700,
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
    },
    h4: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.12,
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.24,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          minHeight: '100vh',
          color: ink,
          backgroundColor: shellBackground,
        },
        '*': {
          boxSizing: 'border-box',
        },
        '*::-webkit-scrollbar': {
          width: 10,
          height: 10,
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(17, 17, 17, 0.18)',
          borderRadius: 10,
          border: '2px solid transparent',
          backgroundClip: 'content-box',
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '::selection': {
          backgroundColor: alpha(accent, 0.12),
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
          border: `1px solid ${alpha(ink, 0.06)}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: `1px solid ${alpha(ink, 0.08)}`,
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: surfaceBackground,
          borderColor: alpha(ink, 0.08),
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          paddingInline: 18,
          paddingBlock: 10,
          transition: 'transform 180ms ease, background-color 180ms ease, border-color 180ms ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          boxShadow: 'none',
          backgroundColor: ink,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#2a2a2a',
          },
        },
        outlined: {
          borderColor: alpha(ink, 0.14),
          backgroundColor: surfaceBackground,
        },
        text: {
          paddingInline: 12,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'transform 180ms ease, background-color 180ms ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: surfaceBackground,
          transition: 'border-color 180ms ease, background-color 180ms ease',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(accent, 0.4),
            borderWidth: 1,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(accent, 0.22),
          },
        },
        notchedOutline: {
          borderColor: alpha(ink, 0.12),
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          fontWeight: 600,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: 'none',
          border: `1px solid ${alpha(ink, 0.08)}`,
        },
      },
    },
  },
});

export { lightTheme };
