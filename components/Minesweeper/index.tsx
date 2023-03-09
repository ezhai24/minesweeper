import styled from '@emotion/styled';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

import { useStopwatch } from '@/hooks/useStopwatch';

import Plot from './Plot';
import Sailor from './Sailor';
import {
  FieldSize,
  FieldSizeConfig,
  generateMinefield,
  PlotState,
} from './utils';

type FieldSizeOption = { label: string; value: keyof typeof FieldSize };
const fieldSizeOptions: FieldSizeOption[] = [
  { label: 'Beginner', value: 'BEGINNER' },
  { label: 'Intermediate', value: 'INTERMEDIATE' },
  { label: 'Expert', value: 'EXPERT' },
];

const Minefield = styled.div({
  width: 'fit-content',
});

const TickerPanel = styled.div({
  display: 'flex',
  marginTop: 20,
  marginBottom: 10,
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  fontFamily: 'Seven Segments',
  fontSize: 24,
});

const ResetButton = styled.div({
  border: 'none',
  backgroundColor: 'none',
  ':hover': {
    cursor: 'pointer',
  },
});

const Row = styled.div({
  display: 'flex',
});

const Minesweeper = () => {
  const {
    elapsedTime,
    isStopwatchRunning,
    startStopwatch,
    stopStopwatch,
    resetStopwatch,
  } = useStopwatch();

  const [fieldSize, setFieldSize] = useState(FieldSize.BEGINNER);
  const [minefield, setMinefield] = useState(
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
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  let unsweptPlots = 0;
  let flagsLeft = fieldSize.numMines;
  plotStates.forEach((row) =>
    row.forEach((plotState) => {
      if (plotState !== PlotState.SWEPT) {
        unsweptPlots++;
      }

      if (plotState === PlotState.FLAGGED) {
        flagsLeft--;
      }
    })
  );

  // The number of unswept plots exactly matches the number of mines in the
  // field and the user has not ended the game by detonating any mines yet.
  // The remaining unswept plots must all be mines and the user has won.
  const isGameWon = unsweptPlots === fieldSize.numMines && !isGameOver;

  useEffect(() => {
    if (isGameWon || isGameOver) {
      stopStopwatch();
    }
  }, [stopStopwatch, isGameWon, isGameOver]);

  const changeFieldSize = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!(e.target.value in FieldSize)) {
      return;
    }

    const newFieldSize = FieldSize[e.target.value as keyof typeof FieldSize];
    setFieldSize(newFieldSize);
    resetField(newFieldSize);
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

  const sweepPlot = (e: MouseEvent, row: number, column: number) => {
    // Users believe this is a mine plot so they should not be able to sweep it.
    if (plotStates[row][column] === PlotState.FLAGGED) {
      return;
    }

    const newPlotStates = plotStates.map((row) => row.slice());
    if (minefield[row][column] === -1) {
      // User clicked on a mine plot. Detonate mine and end game :(
      newPlotStates[row][column] = PlotState.DETONATED;
      setIsGameOver(true);
    } else {
      // Sweep the current plot. For ergonomics, recurse adjacent plots and
      // sweep any 3x3 sections that don't have any mines in the entire section.
      newPlotStates[row][column] = PlotState.SWEPT;
      sweepAdjacentPlots(newPlotStates, row, column);
    }
    setPlotStates(newPlotStates);
  };

  const flagPlot = (e: MouseEvent, row: number, column: number) => {
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

  const attemptActionOnPlot = (e: MouseEvent) => {
    const isRightClick = e.nativeEvent.button === 2;
    if (isRightClick) {
      return;
    }

    setIsMouseDown(true);
    document.addEventListener('mouseup', () => setIsMouseDown(false), {
      once: true,
    });
  };

  const actionPlot = (e: MouseEvent, row: number, column: number) => {
    if (isGameWon || isGameOver) {
      return;
    }

    if (!isStopwatchRunning) {
      startStopwatch();
    }

    const isLeftMouseUp = e.type === 'mouseup' && e.nativeEvent.button === 0;
    const isRightClick = e.type === 'contextmenu' && e.nativeEvent.button === 2;
    if (isLeftMouseUp) {
      sweepPlot(e, row, column);
    } else if (isRightClick) {
      flagPlot(e, row, column);
    }
  };

  const resetField = (newFieldSize: FieldSizeConfig) => {
    setMinefield(
      generateMinefield(
        newFieldSize.numRows,
        newFieldSize.numColumns,
        newFieldSize.numMines
      )
    );
    setPlotStates(
      Array.from({ length: newFieldSize.numRows }, () =>
        Array.from({ length: newFieldSize.numColumns }, () => PlotState.DEFAULT)
      )
    );
    setIsGameOver(false);

    stopStopwatch();
    resetStopwatch();
  };

  return (
    <Minefield>
      <select onChange={changeFieldSize}>
        {fieldSizeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <TickerPanel>
        <span>{flagsLeft.toString().padStart(3, '0')}</span>
        <ResetButton onClick={() => resetField(fieldSize)}>
          <Sailor
            isMouseDown={isMouseDown}
            isGameWon={isGameWon}
            isGameOver={isGameOver}
          />
        </ResetButton>
        <span>
          {Math.trunc(elapsedTime / 1000)
            .toString()
            .padStart(3, '0')}
        </span>
      </TickerPanel>
      {minefield.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((plotValue, columnIndex) => (
            <Plot
              key={columnIndex}
              plotState={plotStates[rowIndex][columnIndex]}
              plotValue={plotValue}
              onMouseDown={attemptActionOnPlot}
              onSweepPlot={(e) => actionPlot(e, rowIndex, columnIndex)}
              onFlagPlot={(e) => actionPlot(e, rowIndex, columnIndex)}
              isGameWon={isGameWon}
              isGameOver={isGameOver}
            />
          ))}
        </Row>
      ))}
    </Minefield>
  );
};

export default Minesweeper;
