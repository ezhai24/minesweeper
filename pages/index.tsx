import styled from '@emotion/styled';

import { Credits } from '@/components/Credits';
import Minesweeper from '@/components/Minesweeper';

const PageTitle = styled.h1({
  marginTop: 35,
});

const Home = () => (
  <>
    <PageTitle>minesweeper</PageTitle>
    <Minesweeper />
    <Credits />
  </>
);

export default Home;
