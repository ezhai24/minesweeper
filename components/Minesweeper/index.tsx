import styled from '@emotion/styled';
import { MouseEvent, useEffect, useState } from 'react';

import { useStopwatch } from '@/hooks/useStopwatch';

import DifficultySelect from './DifficultySelect';
import Plot from './Plot';
import TickerPanel from './TickerPanel';
import {
  Difficulty,
  FieldSizeConfig,
  generateMinefield,
  getFieldSize,
  PlotState,
} from './utils';

const Gameboard = styled.div(({ numColumns }: { numColumns: number }) => ({
  width: '90%',
  maxWidth: 40 * numColumns,
}));
const Minefield = styled.div(
  ({ numRows, numColumns }: { numRows: number; numColumns: number }) => ({
    display: 'grid',
    gridTemplateRows: `repeat(${numRows}, 1fr)`,
    gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
  })
);

const Minesweeper = () => {
  const {
    elapsedTime,
    isStopwatchRunning,
    startStopwatch,
    stopStopwatch,
    resetStopwatch,
  } = useStopwatch();

  const [difficulty, setDifficulty] = useState(Difficulty.BEGINNER);

  const isSmall =
    typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const fieldSize = getFieldSize(difficulty, isSmall);

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
    const isRightClick = e.type === 'contextmenu';
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
    <>
      <DifficultySelect
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        resetField={resetField}
      />
      <Gameboard numColumns={fieldSize.numColumns}>
        <TickerPanel
          flagsLeft={flagsLeft}
          isMouseDown={isMouseDown}
          isGameWon={isGameWon}
          isGameOver={isGameOver}
          elapsedTime={elapsedTime}
          fieldSize={fieldSize}
          resetField={resetField}
        />
        <Minefield numRows={minefield.length} numColumns={minefield[0].length}>
          {minefield.map((row, rowIndex) =>
            row.map((plotValue, columnIndex) => (
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
            ))
          )}
        </Minefield>
      </Gameboard>
    </>
  );
};

export default Minesweeper;
