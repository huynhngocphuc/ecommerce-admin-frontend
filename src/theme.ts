import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: '#000',
          borderRadius: '8px', // Added border radius
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
      },
    }
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});

export { lightTheme, darkTheme };