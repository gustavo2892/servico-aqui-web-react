import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@rocketseat/unform';
import { FiMail, FiUser, FiLock, FiPhone } from 'react-icons/fi';

import Input from './Input';
import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }
  console.log('Esse é o profile => ', profile);
  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />

        <Input name="name" placeholder="Nome completo" icon={FiUser} />
        <Input
          name="email"
          type="email"
          placeholder="Seu endereço de e-mail"
          icon={FiMail}
        />
        <Input
          name="whatsapp"
          placeholder="Seu WhatsApp"
          icon={FiPhone}
        />
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
