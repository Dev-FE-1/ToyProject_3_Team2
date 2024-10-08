import { ThemeProvider } from '@emotion/react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>
);
