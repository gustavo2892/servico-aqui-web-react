import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';
import { FiMail, FiUser, FiLock, FiPhone } from 'react-icons/fi';
import { AiOutlineDollar, AiOutlineAlignLeft } from 'react-icons/ai';

import AvatarInput from '../../components/AvatarInput';
import InputMask from '../../components/InputMask';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

export default function Profile() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    data.provider = profile.provider;
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

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

  return (
    <Container>
      <Form ref={formRef} initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />

        <h4>Informações Pessoais</h4>
        <hr />
        <Input name="name" placeholder="Nome completo" icon={FiUser} />
        <Input
          name="email"
          type="email"
          placeholder="Seu endereço de e-mail"
          icon={FiMail}
        />
        <InputMask
          name="whatsapp"
          placeholder="Seu WhatsApp"
          icon={FiPhone}
          mask="(99) 99999-9999"
        />
        {profile.provider && (
          <>
            <h4>Mão de Obra</h4>
            <hr />
            <Select
              name="category"
              options={options}
              defaultValue={options.map(option => {
                if (option.value === profile.category) {
                  return option;
                }
              })}
            />
            <Input
              name="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="Preço base"
              icon={AiOutlineDollar}
            />
            <TextArea
              name="description"
              placeholder="Faça uma breve descrição da sua mão de obra"
              icon={AiOutlineAlignLeft}
            />
          </>
        )}
        <h4>Segurança da Conta</h4>
        <hr />
        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
          icon={FiLock}
        />
        <Input
          name="password"
          type="password"
          placeholder="Nova senha"
          icon={FiLock}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de senha"
          icon={FiLock}
        />

        <button type="submit">ATUALIZAR PERFIL</button>
      </Form>
      <button type="button" onClick={handleSignOut}>
        SAIR DO SERVIÇOAQUI
      </button>
    </Container>
  );
}
