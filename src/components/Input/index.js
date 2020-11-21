import React from 'react';
import { useField } from '@rocketseat/unform';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';

const InputContainer = ({ name, icon: Icon, type, placeholder }) => {
  const { error } = useField(name);

  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        type={type}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#fff" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default InputContainer;
