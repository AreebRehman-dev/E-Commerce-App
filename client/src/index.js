import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import './styles.css';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Routes />
    <Toaster
      position='top-right'
      toastOptions={{
        duration: 3000,
        style: {
          background: '#0b1020',
          color: '#ffffff',
          fontSize: '0.9rem',
          fontWeight: 500,
          padding: '12px 16px',
          borderRadius: '12px',
          boxShadow: '0 18px 40px -12px rgba(11, 16, 32, 0.45)',
        },
        success: {
          iconTheme: { primary: '#34d399', secondary: '#0b1020' },
        },
        error: {
          iconTheme: { primary: '#f87171', secondary: '#0b1020' },
        },
      }}
    />
  </ThemeProvider>,
  document.getElementById('root')
);
