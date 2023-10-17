import Head from 'next/head';

import type { AppProps } from 'next/app';

import './globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Minesweeper</title>
        <meta
          name="description"
          content={
            "A nautical spin on the Microsoft's 1990 hit classic, Minesweeper"
          }
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/7segments.ttf"
          as="font"
          type="font/ttf"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
