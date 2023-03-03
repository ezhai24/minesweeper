import styled from '@emotion/styled';
import { MouseEvent, useState } from 'react';

import { FieldSize, generateMinefield, PlotState } from './utils';

const Row = styled.div({
  display: 'flex',
});

const Plot = styled.span({
  width: 16,
  height: 16,
  border: '1px solid black',
  textAlign: 'center',
});

const Minesweeper = () => {
  const [fieldSize] = useState(FieldSize.BEGINNER);
  const [minefield] = useState(
    generateMinefield(
      fieldSize.numRows,
      fieldSize.numColumns,
      fieldSize.numMines
    )
  );
  const [plotStates, setPlotStates] = useState(
    Array.from({ length: fieldSize.numRows }, () =>
      Array.from({ length: fieldSize.numColumns }, () => PlotState.DEFAULT)
    )
  );

  const getPlotDisplayValue = (plotState: PlotState, plotValue: number) => {
    switch (plotState) {
      case PlotState.SWEPT:
        return plotValue;
      case PlotState.FLAGGED:
        return '!';
      case PlotState.QUESTION:
        return '?';
      default:
        return '';
    }
  };

  const sweepAdjacentPlots = (
    currentPlotStates: PlotState[][],
    row: number,
    column: number
  ) => {
    // At least one adjacent plot has a mine. Stop sweeping to avoid detonation.
    if (minefield[row][column] !== 0) {
      return;
    }

    // Iterate over all plots adjacent to the current plot
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          // Skipping any plots that are outside the bounds of the minefield
          row + i >= 0 &&
          row + i < fieldSize.numRows &&
          column + j >= 0 &&
          column + j < fieldSize.numColumns &&
          // Skipping any plots that have already been swept
          currentPlotStates[row + i][column + j] !== PlotState.SWEPT
        ) {
          // Mark these plots as swept and sweep the plots adjacent to them
          currentPlotStates[row + i][column + j] = PlotState.SWEPT;
          sweepAdjacentPlots(currentPlotStates, row + i, column + j);
        }
      }
    }
  };

  const sweepPlot = (
    e: MouseEvent<HTMLSpanElement>,
    row: number,
    column: number
  ) => {
    // The convention for Minesweeper is to hold off on sweeping a plot until
    // the user has released the mouse button (onMouseUp). React v16+ does not
    // differentiate between left/right clicks for this event handler so we do a
    // manual check here. Return on right click since it should flag the plot
    // rather than sweep it.
    const isRightClick = e.nativeEvent.button === 2;
    if (isRightClick) {
      return;
    }

    // Users believe this is a mine plot so they should not be able to sweep it.
    if (plotStates[row][column] === PlotState.FLAGGED) {
      return;
    }

    // Sweep the current plot. For ergonomics, recurse adjacent plots and sweep
    // any 3x3 sections that do not have any mines in the entire section.
    const newPlotStates = plotStates.map((row) => row.slice());
    newPlotStates[row][column] = PlotState.SWEPT;
    sweepAdjacentPlots(newPlotStates, row, column);
    setPlotStates(newPlotStates);
  };

  const flagPlot = (
    e: MouseEvent<HTMLSpanElement>,
    row: number,
    column: number
  ) => {
    e.preventDefault();
    const newPlotStates = plotStates.map((row) => row.slice());
    switch (plotStates[row][column]) {
      case PlotState.DEFAULT:
        newPlotStates[row][column] = PlotState.FLAGGED;
        break;
      case PlotState.FLAGGED:
        newPlotStates[row][column] = PlotState.QUESTION;
        break;
      case PlotState.QUESTION:
        newPlotStates[row][column] = PlotState.DEFAULT;
        break;
    }
    setPlotStates(newPlotStates);
  };

  return (
    <>
      {minefield.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((plotValue, columnIndex) => (
            <Plot
              key={columnIndex}
              onMouseUp={(e) => sweepPlot(e, rowIndex, columnIndex)}
              onContextMenu={(e) => flagPlot(e, rowIndex, columnIndex)}
            >
              {getPlotDisplayValue(
                plotStates[rowIndex][columnIndex],
                plotValue
              )}
            </Plot>
          ))}
        </Row>
      ))}
    </>
  );
};

export default Minesweeper;
