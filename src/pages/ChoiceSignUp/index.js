import React from 'react';

import {
  Container,
  ContentNotProvider,
  ContentProvider,
  ButtonPage,
  ButtonsContainer,
  OptionCenter,
} from './styles';

const ChoiceSignUp = () => {
  return (
    <Container>
      <ContentNotProvider>
        Você vai prestar serviço?
        <ButtonsContainer>
          <ButtonPage to="/register-provider">Clique Aqui</ButtonPage>
        </ButtonsContainer>
      </ContentNotProvider>
      <OptionCenter>
        <h2>OU</h2>
      </OptionCenter>
      <ContentProvider>
        Procurando um prestador?
        <ButtonsContainer>
          <ButtonPage to="/register">Clique Aqui</ButtonPage>
        </ButtonsContainer>
      </ContentProvider>
    </Container>
  );
};

export default ChoiceSignUp;
