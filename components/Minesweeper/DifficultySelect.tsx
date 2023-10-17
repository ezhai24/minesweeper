import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { Difficulty, FieldSize, FieldSizeConfig } from './utils';

type FieldSizeOption = { label: string; value: keyof typeof FieldSize };
const fieldSizeOptions: FieldSizeOption[] = [
  { label: 'beginner', value: Difficulty.BEGINNER },
  { label: 'intermediate', value: Difficulty.INTERMEDIATE },
  { label: 'expert', value: Difficulty.EXPERT },
];

const ButtonBar = styled.div({
  display: 'flex',
  justifyContent: 'center',
  gap: 10,
});

const Button = styled.button({
  position: 'relative',
  border: 'none',
  padding: '5px 10px',
  background: 'none',
  color: 'white',
  ':hover': {
    cursor: 'pointer',
  },
});

const ButtonLabel = styled.span({
  zIndex: 1,
  position: 'relative',
  mixBlendMode: 'difference',
});

interface Props {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  resetField: (config: FieldSizeConfig) => void;
}
const DifficultySelect = (props: Props) => {
  const { difficulty, setDifficulty, resetField } = props;

  const changeFieldSize = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    resetField(FieldSize[newDifficulty]);
  };

  return (
    <ButtonBar>
      {fieldSizeOptions.map((option) => (
        <Button
          key={option.value}
          onClick={() => changeFieldSize(option.value)}
        >
          {option.value === difficulty ? (
            <motion.div
              layoutId="activePill"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: 20,
                backgroundColor: 'black', // '#305065',
              }}
              transition={{ type: 'spring', duration: 0.4 }}
            />
          ) : null}
          <ButtonLabel>{option.label}</ButtonLabel>
        </Button>
      ))}
    </ButtonBar>
  );
};

export default DifficultySelect;
