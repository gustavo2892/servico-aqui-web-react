import React, { useEffect, useState, useRef, useCallback } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { AiOutlineAlignLeft } from 'react-icons/ai';
import { useSelector } from 'react-redux';

import api from 'services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import TextArea from '../TextArea';
import { useToast } from '../../hooks/toast';
import {
  TitleContainer,
  Button,
  ContainerButton,
  MessageInfo,
  ContainerButtonConfirm,
} from './styles';

const ModalReport = ({ onCancel, providerId }) => {
  const profile = useSelector(state => state.user.profile);
  const formRef = useRef(null);
  const [type, setType] = useState('info');
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          description: Yup.string().required('Descrição é obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { description } = data;

        setType('warning');

        await api.post('complaint', {
          userId: profile.id,
          providerId,
          userName: profile.name,
          description,
          status: 'Analisar',
        });

        setType('success');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current.setErrors(errors);
          addToast({
            type: 'error',
            title: 'Erro na denúncia',
            description: 'Verifique a descrição e tente novamente',
          });
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na denúncia',
          description: 'Verifique a descrição e tente novamente',
        });
      }
    },
    [addToast, profile.id, profile.name, providerId]
  );

  return (
    <SweetAlert
      type={type}
      onConfirm={false}
      onCancel={() => onCancel()}
      showConfirm={false}
    >
      {type === 'info' && (
        <>
          <TitleContainer>
            <h3>Denunciar</h3>
          </TitleContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <TextArea
              name="description"
              placeholder="Faça uma breve descrição aqui"
              icon={AiOutlineAlignLeft}
            />

            <ContainerButton>
              <Button color="primary" type="button" onClick={() => onCancel()}>
                Cancelar
              </Button>
              <Button color="primary" type="submit">
                Confirmar
              </Button>
            </ContainerButton>
          </Form>
        </>
      )}
      {type === 'warning' && (
        <MessageInfo>
          Aguarde enquanto a requisição está sendo processada
        </MessageInfo>
      )}
      {type === 'success' && (
        <>
          <MessageInfo>
            A denuncia foi realizada com sucesso, a equipe de administradores
            irá analisar o caso
          </MessageInfo>
          <ContainerButtonConfirm>
            <Button color="primary" type="button" onClick={() => onCancel()}>
              Fechar
            </Button>
          </ContainerButtonConfirm>
        </>
      )}
    </SweetAlert>
  );
};

export default ModalReport;
