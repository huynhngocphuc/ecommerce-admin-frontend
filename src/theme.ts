import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background:{
      default:'#f0f5f9',
    }
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});

export { lightTheme, darkTheme };