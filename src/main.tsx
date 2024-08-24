import { StrictMode } from 'react';

import { ThemeProvider } from '@emotion/react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import theme from '@/styles/\btheme';
import GlobalStyle from '@/styles/GlobalStyle';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>
);
