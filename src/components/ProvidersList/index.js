import React from 'react';
import { Link } from 'react-router-dom';

import avatar from '~/assets/avatar.png';
import { ProvidersSelect } from './styles';

function ProvidersList({ providers }) {
  return (
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
          <span>{provider.description}</span>
          <ProvidersSelect.LinkContainer>
            <Link to={`/provider/${provider.id}`}>Ver perfil</Link>
          </ProvidersSelect.LinkContainer>
        </li>
      ))}
    </ProvidersSelect>
  );
}

export default ProvidersList;
