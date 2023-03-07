import styled from '@emotion/styled';
import { useState } from 'react';

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
  const [plotStates] = useState(
    Array.from({ length: fieldSize.numRows }, () =>
      Array.from({ length: fieldSize.numColumns }, () => PlotState.DEFAULT)
    )
  );

  return (
    <>
      {minefield.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((plotValue, columnIndex) => (
            <Plot key={columnIndex}>
              {plotStates[rowIndex][columnIndex] === PlotState.SWEPT
                ? plotValue
                : ''}
            </Plot>
          ))}
        </Row>
      ))}
    </>
  );
};

export default Minesweeper;
