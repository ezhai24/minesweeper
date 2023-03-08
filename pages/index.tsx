import styled from '@emotion/styled';

import Minesweeper from '@/components/Minesweeper';

const Attributions = styled.div({
  marginTop: 10,
});

const Home = () => {
  const attributions = {
    minesweeperFont: {
      link: 'https://fontstruct.com/fontstructions/show/1501665/mine-sweeper',
      authorLink: 'https://fontstruct.com/fontstructors/593973/gezoda',
      licenseLink: 'https://creativecommons.org/licenses/by-sa/3.0/legalcode',
    },
    explosionSvg: {
      link: `https://www.freepik.com/free-vector/cartoon-set-bomb-explosion-eff
        ects_5056889.htm#query=explosion&position=4&from_view=search&track=sph`,
    },
  };

  return (
    <>
      <Minesweeper />
      <Attributions>
        <div>
          <a href={attributions.minesweeperFont.link}>Mine-Sweeper</a>
          <span> font by </span>
          <a href={attributions.minesweeperFont.authorLink}>Gezoda</a>. Licensed
          <span> under the </span>
          <a href={attributions.minesweeperFont.licenseLink}>
            Creative Commons Attribution-Sharealike 3.0
          </a>
          <span> license.</span>
        </div>
        <div>
          <span>Explosion image by </span>
          <a href={attributions.explosionSvg.link}>Freepik</a>.
        </div>
        <div>Ocean texture by me, inspired by Pokémon.</div>
        <div>
          Mines and flags replicated from original Minesweeper game by me.
        </div>
      </Attributions>
    </>
  );
};

export default Home;
