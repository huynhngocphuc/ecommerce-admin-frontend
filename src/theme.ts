// src/theme.ts
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#112D4E',
    },
    secondary: {
      main: '#3F72AF',
    },
    background: {
      default: '#F9F7F7',
      paper: '#DBE2EF',
    },
    error: {
      main: '#dc3545',
    },
    success: {
      main: '#28a745',
    },
    warning: {
      main: '#ffc107',
    },
    text: {
      primary: '#222831',
      secondary: '#393E46',
    },
    
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightBold: 700,
  },
  shape: {
    borderRadius: 8,
  },
  components:{
    MuiSvgIcon: {
       defaultProps: {
        color: 'primary',
      },
    }
  }
});

export { lightTheme };
