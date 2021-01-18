import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FiPhone } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Form } from '@unform/web';
import { AiOutlineAlignLeft } from 'react-icons/ai';
import * as Yup from 'yup';

import history from '~/services/history';
import { Container, TitleContent } from './styles';
import api from '~/services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

function CreateAnnouncement() {
  const profile = useSelector(state => state.user.profile);
  const { addToast } = useToast();
  const formRef = useRef(null);
  const formReadOnlyRef = useRef(null);

  const [visibleButton, setVisibleButton] = useState(false);
  const [defaultData, setDefaultData] = useState({});

  const options = [
    { value: 'ENCANADOR', label: 'Encanador' },
    { value: 'PINTOR', label: 'Pintor' },
    { value: 'ELETRICISTA', label: 'Eletricista' },
    { value: 'MESTRE DE OBRA', label: 'Mestre de Obra' },
    { value: 'PEDREIRO', label: 'Pedreiro' },
    { value: 'AJUDANTE DE PEDREIRO', label: 'Ajudante de Pedreiro' },
    { value: 'ENGENHEIRO CIVIL', label: 'Engenheiro Civil' },
    { value: 'ARQUITETO', label: 'Arquiteto' },
    { value: 'SERVIÇOS GERAIS', label: 'Serviços Gerais' },
    { value: 'MARIDO DE ALUGUEL', label: 'Marido de Aluguel' },
  ];

  useEffect(() => {
    if (profile.provider) {
      history.push('/dashboard');
    }
  }, [profile]);

  useEffect(() => {
    async function loadAnnouncement() {
      const response = await api.get('announcements');

      const { data } = response;

      if (data !== null) {
        setVisibleButton(true);
        setDefaultData(data);
      }
    }

    loadAnnouncement();
  }, []);

  const handleSubmit = useCallback(
    async data => {
      if (!data.title) {
        addToast({
          type: 'error',
          title: 'Erro no anúncio',
          description: 'Selecione uma categoria',
        });
        return;
      }

      try {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          whatsapp: Yup.string().required('WhatsApp obrigatório'),
          description: Yup.string().required(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { whatsapp, title, description } = data;

        const response = await api.post('announcements', {
          title,
          whatsapp,
          description,
        });

        if (response) {
          addToast({
            type: 'success',
            title: 'Anúncio criado',
            description: 'Fique atento as suas mensagens',
          });
          setVisibleButton(true);
          setDefaultData({
            title,
            description,
            whatsapp,
          });
        }
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
    [addToast]
  );

  async function handleDelete() {
    await api.delete('announcements');

    addToast({
      type: 'success',
      title: 'Anúncio deletado',
      description: 'Seu anúncio foi deletado com sucesso.',
    });

    setVisibleButton(false);
    setDefaultData({});
  }

  return (
    <Container>
      {!visibleButton && (
        <>
          <TitleContent>
            <h1>Não encontrou o prestador de serviço?</h1>
            <h3>Crie seu anuncio que algum prestador entrará em contato</h3>
          </TitleContent>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Select name="title" options={options} />
            <InputMask
              name="whatsapp"
              icon={FiPhone}
              placeholder="WhatsApp"
              mask="(99) 99999-9999"
            />
            <TextArea
              name="description"
              placeholder="Faça uma breve descrição aqui"
              icon={AiOutlineAlignLeft}
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
        </>
      )}
      {visibleButton && (
        <>
          <TitleContent>
            <h1>Este é o seu anúncio</h1>
            <h3>Fique atento as suas mensagens</h3>
          </TitleContent>
          <Form ref={formReadOnlyRef} onSubmit={handleSubmit}>
            <Input
              name="title"
              placeholder="Nome completo"
              value={defaultData.title}
            />
            <InputMask
              name="whatsapp"
              value={defaultData.whatsapp}
              placeholder="Seu WhatsApp"
              icon={FiPhone}
              disabled
              mask="(99) 99999-9999"
            />
            <TextArea
              name="description"
              placeholder="Faça uma breve descrição aqui"
              icon={AiOutlineAlignLeft}
              value={defaultData.description}
            />
          </Form>
          <Button type="button" onClick={() => handleDelete()}>
            Deletar Anúncio
          </Button>
        </>
      )}
    </Container>
  );
}

export default CreateAnnouncement;
