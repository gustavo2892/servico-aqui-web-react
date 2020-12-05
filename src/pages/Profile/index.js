import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';
import { FiMail, FiUser, FiLock, FiPhone } from 'react-icons/fi';
import { AiOutlineDollar, AiOutlineAlignLeft } from "react-icons/ai";
import { FaHardHat } from "react-icons/fa";

import InputMask from '../../components/InputMask';
import Input from '../../components/Input';
import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from '../../components/AvatarInput';

import { Container } from './styles';

export default function Profile() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form ref={formRef} initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />

        <Input name="name" placeholder="Nome completo" icon={FiUser} />
        <Input
          name="email"
          type="email"
          placeholder="Seu endereço de e-mail"
          icon={FiMail}
        />
         <Input
          name="category"
          type="text"
          placeholder="Sua categoria"
          icon={FaHardHat}
        />
         <Input
          name="description"
          type="text"
          placeholder="Sua descrição"
          icon={AiOutlineAlignLeft}
        />
         <InputMask
          name="whatsapp"
          placeholder="Seu WhatsApp"
          icon={FiPhone}
          mask="(99) 99999-9999"
        />
        <Input
          name="price"
          type="text"
          placeholder="Seu preço"
          icon={AiOutlineDollar}
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
