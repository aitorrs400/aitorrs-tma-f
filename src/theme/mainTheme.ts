import { createTheme } from '@mui/material/styles';

export interface PaletteColor {
    light?: string;
    main: string;
    dark?: string;
    contrastText?: string;
  }

  
export const theme = createTheme({
  palette: {
    primary: {
      light: '#F5F5F5',
      main: '#9E9E9E',
      dark: '#616161',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#CFD8DC',
      main: '#607D8B',
      dark: '#455A64',
      contrastText: '#212121',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});