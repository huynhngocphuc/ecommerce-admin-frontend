import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background:{
      default:'#fff',
    }
  },
  components:{
    MuiButton:{
      styleOverrides:{
        root:{
        textTransform:'none',
        color:'#000'
        }
      }
    }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});

export { lightTheme, darkTheme };