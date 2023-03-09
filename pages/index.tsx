import styled from '@emotion/styled';
import { useState } from 'react';

import Minesweeper from '@/components/Minesweeper';

const CreditsButton = styled.div({
  marginTop: 10,
  ':hover': {
    cursor: 'pointer',
  },
});

const Attributions = styled.ul({
  marginTop: 4,
});

const Home = () => {
  const attributions = {
    minesweeperFont: {
      link: 'https://fontstruct.com/fontstructions/show/1501665/mine-sweeper',
      authorLink: 'https://fontstruct.com/fontstructors/593973/gezoda',
      licenseLink: 'https://creativecommons.org/licenses/by-sa/3.0/legalcode',
    },
    lcdFont: {
      link: `https://fontstruct.com/fontstructions/show/1972066/
        lcd-calculator-display-tight-7-segment`,
      authorLink: 'https://fontstruct.com/fontstructors/1253492/xenfox',
      licenseLink: `https://fontstruct.com/fontstructions/license/1972066/
        lcd-calculator-display-tight-7-segment`,
    },
    explosionSvg: {
      link: `https://www.freepik.com/free-vector/cartoon-set-bomb-explosion-eff
        ects_5056889.htm#query=explosion&position=4&from_view=search&track=sph`,
    },
    sailorSvg: {
      link: `https://www.freepik.com/free-vector/marine-character-elements-
        collection_5192061.htm#query=ship%20captain&position=20&from_view=search
        &track=ais`,
    },
  };

  const [isAttributionsShowing, setIsAttributionsShowiingng] = useState(false);

  const toggleAttributions = () => setIsAttributionsShowiingng((prev) => !prev);

  return (
    <>
      <Minesweeper />
      <CreditsButton onClick={toggleAttributions}>
        {isAttributionsShowing ? '- ' : '+ '}
        Credits
      </CreditsButton>
      {isAttributionsShowing && (
        <Attributions>
          <li>
            <a href={attributions.minesweeperFont.link}>Mine-Sweeper</a>
            <span> font by </span>
            <a href={attributions.minesweeperFont.authorLink}>Gezoda</a>.
            Licensed
            <span> under the </span>
            <a href={attributions.minesweeperFont.licenseLink}>
              Creative Commons Attribution-Sharealike 3.0
            </a>
            <span> license.</span>
          </li>
          <li>
            <a href={attributions.lcdFont.link}>
              LCD Calculator Display - Tight 7 Segment
            </a>
            <span> font by </span>
            <a href={attributions.lcdFont.authorLink}>Ryan Dunnison (Xenfox)</a>
            <span>. Copyright (c) 2021-2023. Licensed under the </span>
            <a href={attributions.lcdFont.licenseLink}>
              SIL Open Font License, Version 1.1
            </a>
            <span> license.</span>
          </li>
          <li>
            <span>Explosion image by </span>
            <a href={attributions.explosionSvg.link}>Freepik</a>.
          </li>
          <li>
            <span>Base sailor image by </span>
            <a href={attributions.sailorSvg.link}>Freepik</a>. Modified by me.
          </li>
          <li>Ocean texture by me, inspired by Pokémon.</li>
          <li>
            Mines and flags replicated from original Minesweeper game by me.
          </li>
        </Attributions>
      )}
    </>
  );
};

export default Home;
