import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';

import PlotValue from './PlotValue';
import { PlotState } from './utils';

const FieldPlot = styled.span({
  display: 'flex',
  width: 32,
  height: 32,
  border: '1px solid black',
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

  return (
    <FieldPlot onMouseUp={onSweepPlot} onContextMenu={onFlagPlot}>
      <PlotValue
        plotState={plotState}
        plotValue={plotValue}
        isGameWon={isGameWon}
        isGameOver={isGameOver}
      />
    </FieldPlot>
  );
};

export default Plot;
