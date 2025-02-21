import type { AppProps } from 'next/app';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { blueTheme, greenTheme, blackTheme, ThemeOption } from '../theme/themes';
import Head from 'next/head';

const getThemeByName = (theme: ThemeOption) => {
  switch (theme) {
    case 'green':
      return greenTheme;
    case 'black':
      return blackTheme;
    default:
      return blueTheme;
  }
};

export default function App({ Component, pageProps }: AppProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>('blue');

  return (
    <>
      <Head>
        <title>AI Email Agent</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={getThemeByName(currentTheme)}>
        <CssBaseline />
        <Component {...pageProps} currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
      </ThemeProvider>
    </>
  );
}
