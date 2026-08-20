import { createMuiTheme } from '@material-ui/core/styles';

/**
 * Single source of truth for the Material-UI side of the design system.
 * Values mirror the CSS custom properties declared in styles.css so that
 * MUI components and hand-rolled markup share one visual language.
 */
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#818cf8',
      main: '#4f46e5',
      dark: '#4338ca',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#38bdf8',
      main: '#0ea5e9',
      dark: '#0284c7',
      contrastText: '#ffffff',
    },
    error: { main: '#dc2626' },
    warning: { main: '#b45309' },
    info: { main: '#0369a1' },
    success: { main: '#059669' },
    text: {
      primary: '#0b1020',
      secondary: '#6b7488',
    },
    divider: '#e5e8f0',
    background: {
      default: '#f5f6fb',
      paper: '#ffffff',
    },
  },

  shape: {
    borderRadius: 10,
  },

  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    h1: { fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontWeight: 800, letterSpacing: '-0.035em' },
    h2: { fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontWeight: 800, letterSpacing: '-0.03em' },
    h3: { fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontWeight: 700, letterSpacing: '-0.03em' },
    h4: { fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontWeight: 700, letterSpacing: '-0.02em' },
    h6: { fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontWeight: 700, letterSpacing: '-0.02em' },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: 0,
    },
  },

  props: {
    MuiButton: { disableElevation: true },
    MuiTextField: { variant: 'outlined' },
  },

  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#f5f6fb',
        },
      },
    },
    MuiButton: {
      root: {
        borderRadius: 10,
        padding: '10px 20px',
        fontSize: '0.9rem',
      },
      contained: {
        boxShadow: '0 6px 16px -8px rgba(79, 70, 229, 0.28)',
        '&:hover': {
          boxShadow: '0 10px 22px -10px rgba(79, 70, 229, 0.28)',
        },
      },
      outlined: {
        borderColor: '#d5dae6',
      },
      sizeLarge: {
        padding: '13px 26px',
        fontSize: '0.96rem',
        borderRadius: 12,
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 10,
        backgroundColor: '#ffffff',
        '& $notchedOutline': {
          borderColor: '#d5dae6',
        },
        '&:hover $notchedOutline': {
          borderColor: '#9aa2b5',
        },
        '&$focused $notchedOutline': {
          borderWidth: 1,
          borderColor: '#4f46e5',
        },
        '&$focused': {
          boxShadow: '0 0 0 4px rgba(79, 70, 229, 0.18)',
        },
      },
      input: {
        padding: '14px 14px',
      },
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 16px) scale(1)',
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: '0.94rem',
        color: '#6b7488',
      },
    },
    MuiCheckbox: {
      root: {
        color: '#c3c9d8',
      },
    },
    MuiRadio: {
      root: {
        color: '#c3c9d8',
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 14,
      },
      elevation1: {
        boxShadow: '0 1px 3px rgba(16, 24, 40, 0.08), 0 1px 2px rgba(16, 24, 40, 0.04)',
      },
      elevation8: {
        boxShadow: '0 18px 40px -12px rgba(16, 24, 40, 0.18), 0 6px 14px -8px rgba(16, 24, 40, 0.1)',
      },
    },
    MuiIconButton: {
      root: {
        color: '#39415a',
        borderRadius: 10,
      },
    },
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: '0.93rem',
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#0b1020',
        fontSize: '0.78rem',
        padding: '7px 10px',
        borderRadius: 8,
      },
    },
    MuiDrawer: {
      paper: {
        borderRadius: 0,
      },
    },
    MuiFormControlLabel: {
      label: {
        fontSize: '0.9rem',
        color: '#39415a',
      },
    },
  },
});

export default theme;
