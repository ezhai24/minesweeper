/**
 * PLOT STATES
 */
export enum PlotState {
  DEFAULT = 'DEFAULT',
  SWEPT = 'SWEPT',
  FLAGGED = 'FLAGGED',
  QUESTION = 'QUESTION',
  DETONATED = 'DETONATED',
}

/**
 * FIELD SIZE CONFIGURATIONS
 */
export const FieldSize = {
  BEGINNER: {
    numRows: 9,
    numColumns: 9,
    numMines: 10,
  },
  INTERMEDIATE: {
    numRows: 16,
    numColumns: 16,
    numMines: 40,
  },
  EXPERT: {
    numRows: 16,
    numColumns: 30,
    numMines: 99,
  },
};

/**
 * MINEFIELD GENERATION LOGIC
 */
const getCellNumber = (minefield: number[][], row: number, col: number) => {
  const number =
    (minefield[row - 1]?.[col - 1] === -1 ? 1 : 0) +
    (minefield[row - 1]?.[col] === -1 ? 1 : 0) +
    (minefield[row - 1]?.[col + 1] === -1 ? 1 : 0) +
    (minefield[row]?.[col - 1] === -1 ? 1 : 0) +
    (minefield[row]?.[col] === -1 ? 1 : 0) +
    (minefield[row]?.[col + 1] === -1 ? 1 : 0) +
    (minefield[row + 1]?.[col - 1] === -1 ? 1 : 0) +
    (minefield[row + 1]?.[col] === -1 ? 1 : 0) +
    (minefield[row + 1]?.[col + 1] === -1 ? 1 : 0);
  return number;
};

export const generateMinefield = (
  numFieldRows: number,
  numFieldCols: number,
  numMines: number
) => {
  const minefield: number[][] = Array.from({ length: numFieldRows }, () =>
    Array.from({ length: numFieldCols }, () => 0)
  );

  // Generate field with mines
  for (let i = 0; i < numMines; i++) {
    const row = Math.floor(Math.random() * numFieldRows);
    const col = Math.floor(Math.random() * numFieldCols);

    if (minefield[row][col] !== -1) {
      minefield[row][col] = -1;
    } else {
      i--;
    }
  }

  // Calculate counts for non-mine cells
  minefield.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell !== -1) {
        minefield[rowIndex][columnIndex] = getCellNumber(
          minefield,
          rowIndex,
          columnIndex
        );
      }
    });
  });

  return minefield;
};
