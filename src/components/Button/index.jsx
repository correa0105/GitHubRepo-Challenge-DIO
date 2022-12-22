import React from 'react';
import { ButtonContainer } from './styles';

function Button({onClick}) {
  return (
    <ButtonContainer>
      <button onClick={onClick}>Buscar</button>
    </ButtonContainer>
  )
}

export default Button;