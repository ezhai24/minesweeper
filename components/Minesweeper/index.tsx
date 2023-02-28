import styled from '@emotion/styled';
import { useState } from 'react';

const Plot = styled.span({
  display: 'inline-block',
  width: 16,
  border: '1px solid black',
  textAlign: 'center',
});

interface Props {
  initialMinefield: number[][];
}

const Minesweeper = (props: Props) => {
  const { initialMinefield } = props;

  const [minefield] = useState(initialMinefield);

  return (
    <>
      {minefield.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((plotValue, columnIndex) => (
            <Plot key={columnIndex}>{plotValue}</Plot>
          ))}
        </div>
      ))}
    </>
  );
};

export default Minesweeper;
