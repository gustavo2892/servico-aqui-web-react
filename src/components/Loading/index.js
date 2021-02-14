import React from 'react';

import { Container, LogoContainer } from './styles';
import loadingImg from '../../assets/images/loading.jpg';
import logoImg from '../../assets/logo.svg';

function Loading() {
  return (
    <>
      <Container>
        <img src={loadingImg} alt="LoadingServicoAqui" width={120} />
        <span>Aguarde alguns instantes...</span>
      </Container>
      <LogoContainer>
        <img src={logoImg} alt="ServicoAqui" width={70} />
      </LogoContainer>
    </>
  );
}

export default Loading;
