import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { theme } from './theme/mainTheme';
import { store } from './store/store';
import { AppRouter } from './routes/AppRouter';

const App = () => {

  return (
    <Provider store={ store }>
      <ThemeProvider theme={ theme }>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  )
}

export default App;