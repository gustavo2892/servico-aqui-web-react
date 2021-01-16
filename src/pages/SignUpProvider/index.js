import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser, FiLock, FiPhone } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Container, Footer, Fieldset, Content } from './styles';
import PageHeader from '../../components/PageHeaderCreateProvider';
import warningIcon from '../../assets/images/icons/warning.svg';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import { signUpProviderRequest } from '~/store/modules/auth/actions';

const SignUpProvider = () => {
  const formRef = useRef(null);
  const { addToast } = useToast();
  const dispatch = useDispatch();

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          whatsapp: Yup.string().required('WhatsApp obrigatório'),
          confirmPassword: Yup.string().min(6, 'No mínimo 6 dígitos'),
          price: Yup.string().required('Valor do Serviço é obrigatório'),
          description: Yup.string().required(),
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

        const {
          name,
          email,
          whatsapp,
          password,
          category,
          price,
          description,
        } = data;

        dispatch(
          signUpProviderRequest(
            name,
            email,
            whatsapp,
            password,
            category,
            price,
            description
          )
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current.setErrors(errors);
          addToast({
            type: 'error',
            title: 'Erro na cadastro',
            description: 'Verifique os dados e tente novamente',
          });
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
      <PageHeader />
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Fieldset>
            <legend>Identificação</legend>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <InputMask
              name="whatsapp"
              icon={FiPhone}
              placeholder="WhatsApp"
              mask="(99) 99999-9999"
            />
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
          </Fieldset>
          <Fieldset>
            <legend>Seu Serviço</legend>
            <Select name="category" options={options} />
            <Input
              name="price"
              placeholder="Valor Base do Serviço por Dia"
              type="number"
              min="1"
              step="0.01"
              prefix="R$"
            />
            <TextArea
              name="description"
              placeholder="Faça uma breve descrição aqui"
            />
          </Fieldset>
          <Footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante!
              <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar Cadastro</button>
          </Footer>
        </Form>
      </Content>
    </Container>
  );
};

export default SignUpProvider;
