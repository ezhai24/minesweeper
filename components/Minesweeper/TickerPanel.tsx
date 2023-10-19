import styled from '@emotion/styled';

import Sailor from './Sailor';
import { FieldSizeConfig } from './utils';

const Panel = styled.div({
  display: 'flex',
  marginTop: 20,
  marginBottom: 10,
  justifyContent: 'center',
  alignItems: 'flex-end',
  gap: 70,
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

interface Props {
  flagsLeft: number;
  elapsedTime: number;
  isMouseDown: boolean;
  isGameWon: boolean;
  isGameOver: boolean;
  fieldSize: FieldSizeConfig;
  resetField: (config: FieldSizeConfig) => void;
}
const TickerPanel = (props: Props) => {
  const {
    flagsLeft,
    isMouseDown,
    isGameWon,
    isGameOver,
    elapsedTime,
    fieldSize,
    resetField,
  } = props;
  return (
    <Panel>
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
    </Panel>
  );
};

export default TickerPanel;
