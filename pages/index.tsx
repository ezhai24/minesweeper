import Minesweeper from '@/components/Minesweeper';
import { FieldSize, generateMinefield } from '@/components/Minesweeper/utils';

interface Props {
  initialMinefield: number[][];
}

const Home = (props: Props) => {
  const { initialMinefield } = props;
  return <Minesweeper initialMinefield={initialMinefield} />;
};

export async function getStaticProps() {
  // Generate the initial minefield at build time to avoid a React hydration
  // error [https://nextjs.org/docs/messages/react-hydration-error].
  //
  // Calling generateMinefield at run time means it will be called once during
  // the pre-render and again during the first render (hydration). Because each
  // generation produces a different minefield configuration, there will be a
  // discrepancy in the minefield values between these two renders causing React
  // to throw a hydration error.
  const { numRows, numColumns, numMines } = FieldSize.BEGINNER;
  const initialMinefield = generateMinefield(numRows, numColumns, numMines);
  return { props: { initialMinefield } };
}

export default Home;
