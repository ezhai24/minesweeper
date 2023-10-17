import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const attributions = {
  minesweeperFont: {
    link: 'https://fontstruct.com/fontstructions/show/1501665/mine-sweeper',
    authorLink: 'https://fontstruct.com/fontstructors/593973/gezoda',
    licenseLink: 'https://creativecommons.org/licenses/by-sa/3.0/legalcode',
  },
  segmentsFont: {
    link: 'https://fontstruct.com/fontstructions/show/1462474/7segments-1',
    authorLink: 'https://fontstruct.com/fontstructors/547600/g4mmler',
    licenseLink: 'https://creativecommons.org/licenses/by-sa/3.0/legalcode',
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

const listVariants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: 1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};
const itemVariants = {
  initial: { y: -50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -10, opacity: 0 },
};

const Container = styled.div({
  height: 190,
  ul: {
    padding: 0,
    li: {
      fontSize: 12,
    },
  },
});
const CreditsButton = styled.div({
  display: 'flex',
  justifyContent: 'center',
  gap: 5,
  marginTop: 40,
  ':hover': {
    cursor: 'pointer',
  },
});

export const Credits = () => {
  const [isAttributionsShowing, setIsAttributionsShowing] = useState(false);

  const toggleAttributions = () => setIsAttributionsShowing((prev) => !prev);

  return (
    <Container>
      <CreditsButton onClick={toggleAttributions}>
        credits
        <motion.div animate={{ rotate: isAttributionsShowing ? -135 : 0 }}>
          +
        </motion.div>
      </CreditsButton>
      <AnimatePresence>
        {isAttributionsShowing && (
          <motion.ul
            key="attributions"
            variants={listVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              marginTop: 4,
              listStyleType: 'none',
              textAlign: 'center',
            }}
          >
            <motion.li variants={itemVariants}>
              <a href={attributions.minesweeperFont.link}>Mine-Sweeper</a>
              <span> font by </span>
              <a href={attributions.minesweeperFont.authorLink}>Gezoda</a>.
              Licensed
              <span> under the </span>
              <a href={attributions.minesweeperFont.licenseLink}>
                Creative Commons Attribution-Sharealike 3.0
              </a>
              <span> license.</span>
            </motion.li>
            <motion.li variants={itemVariants}>
              <a href={attributions.segmentsFont.link}>7Segments</a>
              <span> font by </span>
              <a href={attributions.segmentsFont.authorLink}>g4mmler</a>
              <span>. Licensed under the </span>
              <a href={attributions.segmentsFont.licenseLink}>
                Creative Commons Attribution-Sharealike 3.0
              </a>
              <span> license.</span>
            </motion.li>
            <motion.li variants={itemVariants}>
              <span>Explosion image by </span>
              <a href={attributions.explosionSvg.link}>Freepik</a>.
            </motion.li>
            <motion.li variants={itemVariants}>
              <span>Base sailor image by </span>
              <a href={attributions.sailorSvg.link}>Freepik</a>. Modified by me.
            </motion.li>
            <motion.li variants={itemVariants}>
              Ocean texture by me, inspired by Pokémon.
            </motion.li>
            <motion.li variants={itemVariants}>
              Mines and flags replicated from original Minesweeper game by me.
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </Container>
  );
};
