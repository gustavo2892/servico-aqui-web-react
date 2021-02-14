import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../../components/Loading';
import api from '../../services/api';
// import { Container } from './styles';

function Provider() {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);
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

      setLoading(false);
      setHours(response.data);
    }

    loadAvailable();
  }, [date, id]);

  return loading ? <Loading /> : <div>Aqui será a página de profile</div>;
}

export default Provider;
