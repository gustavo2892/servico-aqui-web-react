import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

import { Container, Content, AnimationContainer } from './styles';
import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve conter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Link to="/">
            <img src={logo} width="150" height="130" alt="ServiçoAqui" />
          </Link>

          <Form schema={schema} onSubmit={handleSubmit}>
            <Input name="name" placeholder="Nome completo" />
            <Input name="email" type="email" placeholder="Seu e-mail" />
            <Input name="password" type="password" placeholder="Sua senha" />
            <button type="submit">CRIAR CONTA</button>
            <Link to="/">Já possuo uma conta</Link>
          </Form>
        </AnimationContainer>
      </Content>
    </ Container>
  );
}
