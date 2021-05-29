import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiUser, FiLock, FiPhone } from 'react-icons/fi';
import { FaEnvelope, FaHotel, FaHospitalAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { AiOutlineAlignLeft } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import verifyCep from 'utils/verifyCep';
import viaCep from 'services/viaCep';
import {
  Container,
  Footer,
  Fieldset,
  Content,
  AddressContainer,
} from './styles';
import PageHeader from '../../components/PageHeaderCreateProvider';
import warningIcon from '../../assets/images/icons/warning.svg';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import InputMask from '../../components/InputMask';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import { signUpProviderRequest } from '~/store/modules/auth/actions';

const SignUpProvider = () => {
  const formRef = useRef(null);
  const { addToast } = useToast();
  const dispatch = useDispatch();
  const [loadingCep, setLoadingCep] = useState(null);

  const options = [
    { value: 'encanador', label: 'Encanador' },
    { value: 'pintor', label: 'Pintor' },
    { value: 'eletricista', label: 'Eletricista' },
    { value: 'mestre-de-obra', label: 'Mestre de Obra' },
    { value: 'pedreiro', label: 'Pedreiro' },
    { value: 'ajudante-de-pedreiro', label: 'Ajudante de Pedreiro' },
    { value: 'engenheiro-civil', label: 'Engenheiro Civil' },
    { value: 'arquiteto', label: 'Arquiteto' },
    { value: 'servicos-gerais', label: 'Serviços Gerais' },
    { value: 'marido-de-aluguel', label: 'Marido de Aluguel' },
  ];

  const handleSubmit = useCallback(
    async data => {
      if (!data.category) {
        addToast({
          type: 'error',
          title: 'Erro na cadastro',
          description: 'Selecione uma categoria',
        });
        return;
      }

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
          description: Yup.string().required('Descrição é obrigatório'),
          cep: Yup.string().test(
            'validation-cep',
            'Digite um Cep válido',
            function(value) {
              return verifyCep(value);
            }
          ),
          city: Yup.string().required('Digite um Cep válido'),
          uf: Yup.string().required('Digite um Cep válido'),
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
          cep,
          city,
          uf,
        } = data;

        dispatch(
          signUpProviderRequest(
            name,
            email,
            whatsapp,
            password,
            category,
            price,
            description,
            cep,
            city,
            uf
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

  const onChangeCep = async e => {
    const cepAnalysis = verifyCep(e.target.value);

    if (cepAnalysis) {
      setLoadingCep(true);

      const response = await viaCep.get(`${e.target.value}/json/`);

      if (response.status === 200 && response.data.localidade) {
        formRef.current.setData({
          city: response.data.localidade,
          uf: response.data.uf,
        });
      } else {
        toast.error('Digite um CEP válido');
        formRef.current.clearField('city');
        formRef.current.clearField('uf');
      }
    } else {
      formRef.current.clearField('city');
      formRef.current.clearField('uf');
    }

    setLoadingCep(false);
  };

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
            <InputPassword
              name="password"
              icon={FiLock}
              placeholder="Senha"
              type="password"
            />
            <InputPassword
              name="confirmPassword"
              icon={FiLock}
              placeholder="Confirme sua Senha"
              type="password"
            />
          </Fieldset>
          <Fieldset>
            <legend>Endereço</legend>
            <InputMask
              name="cep"
              icon={FaEnvelope}
              placeholder="CEP"
              mask="99999-999"
              onChange={e => onChangeCep(e)}
              loading={loadingCep}
            />
            <Input
              name="city"
              icon={FaHotel}
              placeholder="Cidade"
              type="text"
              disabled
            />
            <Input
              name="uf"
              placeholder="UF"
              type="text"
              icon={FaHospitalAlt}
              disabled
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
              icon={AiOutlineAlignLeft}
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
