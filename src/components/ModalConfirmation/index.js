import React, { useEffect, useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import api from 'services/api';

import { MessageInfo, Button, ContainerButton, ContainerButtonConfirm } from './styles';

const ModalConfirmation = ({
  onConfirm,
  time,
  onCancel,
  messageSuccess,
  message,
  providerId,
}) => {
  const [type, setType] = useState('info');

  const handleConfirm = async () => {
    setType('warning');

    try {
      await api.post('appointments', {
        provider_id: providerId,
        date: time,
      });
      setType('success');
    } catch {
      setType('success');
    }
  };

  return (
    <SweetAlert
      type={type}
      title={false}
      showConfirm={false}
      onConfirm={false}
      onCancel={false}
    >
      {type === 'info' && (
        <>
          <MessageInfo>{message}</MessageInfo>
          <ContainerButton>
            <Button color="primary" type="button" onClick={() => onCancel()}>
              Não
            </Button>
            <Button
              color="primary"
              type="button"
              onClick={() => handleConfirm()}
            >
              Sim
            </Button>
          </ContainerButton>
        </>
      )}
      {type === 'warning' && (
        <MessageInfo>
          Aguarde enquanto a requisição está sendo processada
        </MessageInfo>
      )}
      {type === 'success' && (
        <>
          <MessageInfo>{messageSuccess}</MessageInfo>
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

export default ModalConfirmation;
