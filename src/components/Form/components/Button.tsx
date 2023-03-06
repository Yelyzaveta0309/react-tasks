import React, {FC} from 'react';

interface ButtonProps {
  disabled: boolean;
  onButtonClick?: () => void;
}
export const Button: FC<ButtonProps> = ({disabled, onButtonClick}) => (

  <button type="submit" disabled={disabled} onClick={onButtonClick}>click</button>

);
