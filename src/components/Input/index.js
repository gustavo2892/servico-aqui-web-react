import React from 'react';
import { Input } from '@rocketseat/unform';
import { Container } from './styles';

const InputContainer = ({ name, icon: Icon, type, placeholder }) => {
  return (
    <Container>
      {Icon && <Icon size={20} />}
      <Input
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        type={type}
      />
    </Container>
  );
};

export default InputContainer;
