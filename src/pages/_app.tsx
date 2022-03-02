import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { theme, createEmotionCache } from '@/utils/index';
import { AppLayout } from '@/components/index';
import { AppWeb3Provider } from '@/hooks/index';
import { BigNumber } from 'bignumber.js';

BigNumber.set({
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const NoneLayout = (page: any) => <>{page}</>;

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: React.FC<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // @ts-ignore
  const getLayout = Component?.getLayout || NoneLayout;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AppWeb3Provider>
          <AppLayout> {getLayout(<Component {...pageProps} />)}</AppLayout>
        </AppWeb3Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
