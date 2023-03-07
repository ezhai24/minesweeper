import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';

import PlotValue from './PlotValue';
import { PlotState } from './utils';

const Colors = {
  BORDER: '#435aa8',
  DEEP_OCEAN: '#577efa',
  SHALLOW_OCEAN: '#b8c8ff',
};

const FieldPlot = styled.div(
  ({ isPlotUncovered }: { isPlotUncovered: boolean }) => ({
    position: 'relative',
    width: 32,
    height: 32,
    border: `1px solid ${Colors.BORDER}`,
    backgroundColor: isPlotUncovered ? Colors.DEEP_OCEAN : Colors.SHALLOW_OCEAN,

    '::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.15,
      backgroundImage: 'url(/ocean-texture.svg)',
      backgroundSize: 'contain',
    },
  })
);

const Content = styled.div({
  position: 'relative',
  display: 'flex',
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Minesweeper',
});

interface Props {
  plotState: PlotState;
  plotValue: number;
  onSweepPlot: MouseEventHandler;
  onFlagPlot: MouseEventHandler;
  isGameWon: boolean;
  isGameOver: boolean;
}

const Plot = (props: Props) => {
  const {
    plotState,
    plotValue,
    onSweepPlot,
    onFlagPlot,
    isGameWon,
    isGameOver,
  } = props;

  const isIncorrectlyFlagged =
    plotState === PlotState.FLAGGED && plotValue !== -1;
  const isIncorrectlyUnflagged =
    plotState !== PlotState.FLAGGED && plotValue === -1;
  const isPlotUncovered =
    plotState === PlotState.SWEPT ||
    plotState === PlotState.DETONATED ||
    (isGameOver && (isIncorrectlyFlagged || isIncorrectlyUnflagged));

  return (
    <FieldPlot
      isPlotUncovered={isPlotUncovered}
      onMouseUp={onSweepPlot}
      onContextMenu={onFlagPlot}
    >
      <Content>
        <PlotValue
          plotState={plotState}
          plotValue={plotValue}
          isGameWon={isGameWon}
          isGameOver={isGameOver}
        />
      </Content>
    </FieldPlot>
  );
};

export default Plot;
