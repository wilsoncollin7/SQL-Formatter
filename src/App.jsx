import * as React from 'react';
import { CssBaseline, createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Form from './components/Form';
import NavBar from './components/NavBar';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#388e3c',
    },
    secondary: {
      main: '#f57c00',
    },
  },
});

const App = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Form />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
