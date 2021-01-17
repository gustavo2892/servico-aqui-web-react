import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { Container, Content, TopBar } from './styles';

import logoImg from '../../assets/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

const PageHeaderCreateProvider = props => {
  const history = useHistory();
  const { title, description, children } = props;

  return (
    <Container>
      <TopBar>
        <Link to="/">
          <FiArrowLeft style={{ marginTop: 25, marginRight: 20 }} /> Já tenho
          conta
        </Link>

        <Link to="/">
          <img src={logoImg} alt="Proffy" width={70} />
        </Link>
      </TopBar>

      <Content>
        <strong>{title}</strong>
        {description && <p>{description}</p>}

        {children}
      </Content>
    </Container>
  );
};

export default PageHeaderCreateProvider;
