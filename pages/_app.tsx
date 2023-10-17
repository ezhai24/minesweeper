import { css, Global } from '@emotion/react';
import Head from 'next/head';

import type { AppProps } from 'next/app';

import './globals.css';

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
            font-family: 'Seven Segments';
            src: url('/fonts/7segments.ttf');
          }
        `}
      />
      <Component {...pageProps} />
    </>
  );
}
