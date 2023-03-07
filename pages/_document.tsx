import { css, Global } from '@emotion/react';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Global
          styles={css`
            @font-face {
              font-family: 'Minesweeper';
              src: url('/fonts/mine-sweeper.ttf');
            }
          `}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
