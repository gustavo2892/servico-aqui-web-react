import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, AnimationContainer, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { signUpRequest } from '~/store/modules/auth/actions';
import { useToast } from '../../hooks/toast';

const SignUp = () => {
  const formRef = useRef(null);
  const { addToast } = useToast();
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async data => {
      data.provider = true;

      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          confirmPassword: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (data.password !== data.confirmPassword) {
          addToast({
            type: 'error',
            title: 'Erro na cadastro',
            description: 'As duas senhas devem ser iguais, tente novamente',
          });
          return;
        }

        const { name, email, password } = data;

        dispatch(signUpRequest(name, email, password));
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
        });
      }
    },
    [addToast, dispatch]
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <Link to="/">
            <img src={logoImg} alt="ServicoAqui" width={120} />
          </Link>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              placeholder="Senha"
              type="password"
            />

            <Input
              name="confirmPassword"
              icon={FiLock}
              placeholder="Confirme sua Senha"
              type="password"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Já tenho conta
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
