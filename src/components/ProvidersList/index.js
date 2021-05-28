import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import avatar from '~/assets/avatar.png';
import { ProvidersSelect } from './styles';
import ModalReport from '../ModalReport';

function ProvidersList({ providers }) {
  const [alert, setAlert] = useState(null);

  function hideAlert() {
    setAlert(null);
  }

  function openModal(providerId) {
    const getAlert = () => (
      <ModalReport onCancel={() => hideAlert()} providerId={providerId} />
    );
    setAlert(getAlert());
  }
  return (
    <>
      <ProvidersSelect>
        {providers.map(provider => (
          <li key={provider.id}>
            <ProvidersSelect.ImageContainer>
              <img
                src={(provider.avatar && provider.avatar.url) || avatar}
                alt="Avatar"
              />
            </ProvidersSelect.ImageContainer>
            <strong>{provider.name}</strong>
            <span>{provider.category.toUpperCase()}</span>
            {provider.city ? (
              <span>
                {provider.city} - {provider.uf}
              </span>
            ) : (
              <span>Localidade não Informada.</span>
            )}
            <ProvidersSelect.LinkContainer>
              <span onClick={() => openModal(provider.id)}>Denunciar</span>
              <Link to={`/provider/${provider.id}`}>Ver perfil</Link>
            </ProvidersSelect.LinkContainer>
          </li>
        ))}
      </ProvidersSelect>
      {providers.length === 0 && (
        <div style={{ justifyContent: 'center', display: 'flex' }}>
          <h1>Desculpe, não encontramos nenhum prestador.</h1>
        </div>
      )}
      {alert}
    </>
  );
}

export default ProvidersList;
