import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useSelector } from 'react-redux';
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
import { FiSearch } from 'react-icons/fi';
import api from '~/services/api';

import {
  Container,
  Time,
  ContainerSearchInput,
  ContainerSearch,
  Prefix,
} from './styles';
import ProvidersList from '../../components/ProvidersList';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);
  const profile = useSelector(state => state.user.profile);

  const [providers, setProviders] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const inputRef = useRef(null);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current.value);
  }, []);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers');

      setProviders(response.data);
    }

    loadProviders();
  }, []);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  async function searchProviders(text) {
    const response = await api.get(`search/providers?query=${text}`);
    setProviders(response.data.providers);
  }

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { date },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = range.map(hour => {
        const checkDate = setMilliseconds(
          setSeconds(setMinutes(setHours(date, hour), 0), 0),
          0
        );
        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(a =>
            isEqual(parseISO(a.date), compareDate)
          ),
        };
      });

      setSchedule(data);
    }

    loadSchedule();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container isProvider={profile.provider}>
      {profile.provider && (
        <>
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
              <Time
                key={time.time}
                past={time.past}
                available={!time.appointment}
              >
                <strong>{time.time}</strong>
                <span>
                  {time.appointment
                    ? `${time.appointment.user.name} - ${time.appointment.user.whatsapp}`
                    : 'Em aberto'}
                </span>
              </Time>
            ))}
          </ul>
        </>
      )}
      {!profile.provider && (
        <>
          <ContainerSearch>
            <ContainerSearchInput isFilled={isFilled} isFocused={isFocused}>
              <FiSearch size={20} />
              <input
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                autoComplete="off"
                name="search"
                type="text"
                ref={inputRef}
                placeholder="Pesquise..."
                onChange={e => {
                  searchProviders(e.target.value);
                }}
              />
            </ContainerSearchInput>
          </ContainerSearch>
          <ProvidersList providers={providers} />
        </>
      )}
    </Container>
  );
}
