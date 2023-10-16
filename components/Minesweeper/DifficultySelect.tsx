import { ChangeEvent } from 'react';

import { FieldSize, FieldSizeConfig } from './utils';

type FieldSizeOption = { label: string; value: keyof typeof FieldSize };
const fieldSizeOptions: FieldSizeOption[] = [
  { label: 'Beginner', value: 'BEGINNER' },
  { label: 'Intermediate', value: 'INTERMEDIATE' },
  { label: 'Expert', value: 'EXPERT' },
];

interface Props {
  setFieldSize: (config: FieldSizeConfig) => void;
  resetField: (config: FieldSizeConfig) => void;
}
const DifficultySelect = (props: Props) => {
  const { setFieldSize, resetField } = props;

  const changeFieldSize = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!(e.target.value in FieldSize)) {
      return;
    }

    const newFieldSize = FieldSize[e.target.value as keyof typeof FieldSize];
    setFieldSize(newFieldSize);
    resetField(newFieldSize);
  };

  return (
    <select onChange={changeFieldSize}>
      {fieldSizeOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DifficultySelect;
