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
            @font-face {
              font-family: 'Futuba';
              src: url('/fonts/futaba-digital-7.ttf');
            }
            @font-face {
              font-family: 'LCD Calculator';
              src: url('/fonts/lcd-calculator-display-tight-7-segment.ttf');
            }
          `}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
