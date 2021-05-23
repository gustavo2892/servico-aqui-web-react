import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import InputMask from 'react-input-mask';
import SmallLoading from '../SmallLoading';
import { Container, Error, LoadingContainer } from './styles';

const InputMaskComponent = ({
  name,
  icon: Icon,
  mask,
  loading = false,
  ...rest
}) => {
  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current.value);
  }, []);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <InputMask
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        autoComplete="off"
        defaultValue={defaultValue}
        ref={inputRef}
        type="text"
        {...rest}
        mask={mask}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
      {loading && (
        <LoadingContainer>
          <SmallLoading type="spin" height={30} width={30} />
        </LoadingContainer>
      )}
    </Container>
  );
};

export default InputMaskComponent;
