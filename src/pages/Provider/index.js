import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../../components/Loading';
import api from '../../services/api';
import { Container, SideMenu, ImageContainer } from './styles';
import avatar from '~/assets/avatar.png';

function Provider() {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);
  const [provider, setProvider] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function loadAvailable() {
      setLoading(true);
      const response = await api.get(`providers/${id}/available`, {
        params: {
          date: date.getTime(),
        },
      });

      const responseProvider = await api.get(`providers/${id}`);

      setProvider(responseProvider.data);

      setLoading(false);
      setHours(response.data);
    }

    loadAvailable();
  }, [date, id]);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <SideMenu>
        <ImageContainer>
          <img
            src={(provider.avatar && provider.avatar.url) || avatar}
            alt="Avatar"
          />
        </ImageContainer>
        <p>
          <strong>{provider.name}</strong>
        </p>
      </SideMenu>
      <div>Centro da página</div>
    </Container>
  );
}

export default Provider;
