import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    // ...existing code...
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // ...existing code...
  },
});

export { lightTheme, darkTheme };