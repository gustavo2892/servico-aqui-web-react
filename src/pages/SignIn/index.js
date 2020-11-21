import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import { Container, Content, AnimationContainer } from './styles';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Link to="/">
            <img src={logo} width="150" height="130" alt="ServiçoAqui" />
          </Link>

          <Form
            schema={schema}
            onSubmit={handleSubmit}
            onError={false}
            onErrorCapture={false}
          >
            <Input
              name="email"
              type="email"
              placeholder="Seu e-mail"
              icon={FiMail}
            />
            <Input
              name="password"
              type="password"
              placeholder="Sua senha"
              icon={FiLock}
            />
            <button type="submit">
              {loading ? 'Carregando...' : 'ACESSAR'}
            </button>
            <Link to="/register">Criar uma nova conta</Link>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
}
