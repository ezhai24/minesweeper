import { css, Global } from '@emotion/react';
import Head from 'next/head';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Minesweeper</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Global
        styles={css`
          @font-face {
            font-family: 'Minesweeper';
            src: url('/fonts/mine-sweeper.ttf');
          }
          @font-face {
            font-family: 'LCD Calculator';
            src: url('/fonts/lcd-calculator-display-tight-7-segment.ttf');
          }
        `}
      />
      <Component {...pageProps} />
    </>
  );
}
