import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useField } from '@unform/core';

import { Container, IconContainer, Prefix } from './styles';

const Input = ({ name, icon: Icon, prefix, ...rest }) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [passwordVisible, setPasswordVisible] = useState(false);

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
      {prefix && <Prefix>{prefix}</Prefix>}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        autoComplete="off"
        defaultValue={defaultValue}
        ref={inputRef}
        type={passwordVisible ? 'text' : 'password'}
        {...rest}
      />

      <IconContainer>
        {passwordVisible ? (
          <FaEyeSlash
            size={20}
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
        ) : (
          <FaEye
            size={20}
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
        )}
      </IconContainer>
    </Container>
  );
};

export default Input;
