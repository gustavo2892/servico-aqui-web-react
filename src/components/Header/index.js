import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Notifications from '~/components/Notifications';

import logo from '~/assets/logo.svg';
import avatar from '~/assets/avatar.png';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} alt="ServiçoAqui" width="65" height="65" />
          </Link>

          <Link to="/dashboard">
            {profile.provider ? 'AGENDA' : 'PRESTADORES'}
          </Link>
          {profile.provider && <Link to="/announcement">ANÚNCIOS</Link>}
          {!profile.provider && (
            <Link to="/create-announcement">CRIAR ANÚNCIO</Link>
          )}
        </nav>

        <aside>
          <Notifications />

          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src={(profile.avatar && profile.avatar.url) || avatar}
              alt="Avatar"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
