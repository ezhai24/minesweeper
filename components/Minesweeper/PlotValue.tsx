import styled from '@emotion/styled';
import Image from 'next/image';

import { PlotNumberColors, PlotState } from './utils';

const Flag = () => <Image src="/flag.svg" alt="Flag" width={18} height={18} />;
const Mine = () => <Image src="/mine.svg" alt="Mine" width={24} height={24} />;
const CrossedOutMine = () => (
  <Image src="/crossed-out-mine.svg" alt="Mine with X" width={24} height={24} />
);
const ExplodedMine = () => (
  <Image src="/explosion.svg" alt="Explosion" width={32} height={32} />
);
const Number = styled.span(({ color }: { color: string }) => ({
  color: color || 'black',
  WebkitTextStroke: '1px white',
}));

interface Props {
  plotState: PlotState;
  plotValue: number;
  isGameWon: boolean;
  isGameOver: boolean;
}

const PlotValue = (props: Props) => {
  const { plotState, plotValue, isGameWon, isGameOver } = props;

  // If the user has won, mark all mines as flagged regardless of whether
  // they've been flagged manually.
  if (isGameWon) {
    if (plotValue === -1) {
      return <Flag />;
    }
  }

  // If the user has lost the game, we want to specify the detonated mine then
  // reveal all other mines. For the rest of the plots without mines, we want
  // to indicate any that were incorrectly flagged. For all other plots,
  // fallback to the usual value.
  if (isGameOver) {
    if (plotState === PlotState.DETONATED) {
      return <ExplodedMine />;
    }

    if (plotState === PlotState.FLAGGED) {
      if (plotValue !== -1) {
        return <CrossedOutMine />;
      }
    } else {
      if (plotValue === -1) {
        return <Mine />;
      }
    }
  }

  switch (plotState) {
    case PlotState.SWEPT:
      return (
        <Number color={PlotNumberColors[plotValue]}>{plotValue || ''}</Number>
      );
    case PlotState.FLAGGED:
      return <Flag />;
    case PlotState.QUESTION:
      return <>?</>;
  }

  return <></>;
};

export default PlotValue;
