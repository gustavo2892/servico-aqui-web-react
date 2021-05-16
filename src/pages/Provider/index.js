import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import Loading from '../../components/Loading';
import api from '../../services/api';
import {
  Container,
  SideMenu,
  ImageContainer,
  ContainerPageDate,
  Time,
} from './styles';
import avatar from '~/assets/avatar.png';

function Provider() {
  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);
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
      setSchedule(response.data);
    }

    loadAvailable();
  }, [date, id]);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }
  console.log('Esse é o provider => ', provider);
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
        <span>Categoria</span>
        <h3>{provider.category}</h3>
        <span>Preço</span>
        <h3>R$ {provider.price}</h3>
        <span>Descrição</span>
        <h3>{provider.description}</h3>
      </SideMenu>
      <ContainerPageDate>
        <header>
          <button type="button" onClick={handlePrevDay}>
            <MdChevronLeft size={36} color="#fff" />
          </button>
          <strong>{dateFormatted}</strong>
          <button type="button" onClick={handleNextDay}>
            <MdChevronRight size={36} color="#fff" />
          </button>
        </header>
        <ul>
          {schedule.map(time => (
            <Time key={time.time} past={time.past} available={time.available}>
              <strong>{time.time}</strong>
              <span>{time.available ? 'Marcar horário' : 'Indisponível'}</span>
            </Time>
          ))}
        </ul>
      </ContainerPageDate>
    </Container>
  );
}

export default Provider;
