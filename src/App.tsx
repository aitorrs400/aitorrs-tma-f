import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { theme } from './theme/mainTheme';
import { store } from './store/store';
import { AppRouter } from './routes/AppRouter';

const App = () => {

  return (
    <Provider store={ store }>
      <BrowserRouter>
        <ThemeProvider theme={ theme }>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App;