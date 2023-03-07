import { PlotState } from './utils';

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
      return <>!</>;
    }
  }

  // If the user has lost the game, we want to specify the detonated mine then
  // reveal all other mines. For the rest of the plots without mines, we want
  // to indicate any that were incorrectly flagged. For all other plots,
  // fallback to the usual value.
  if (isGameOver) {
    if (plotState === PlotState.DETONATED) {
      return <>D</>;
    }

    if (plotState === PlotState.FLAGGED) {
      if (plotValue !== -1) {
        return <>X</>;
      }
    } else {
      if (plotValue === -1) {
        return <>*</>;
      }
    }
  }

  switch (plotState) {
    case PlotState.SWEPT:
      return <>{plotValue}</>;
    case PlotState.FLAGGED:
      return <>!</>;
    case PlotState.QUESTION:
      return <>?</>;
  }

  return <></>;
};

export default PlotValue;
