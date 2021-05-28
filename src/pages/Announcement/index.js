import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from '../../services/api';
import {
  AnnouncementList,
  ContainerSearchInput,
  ContainerSearch,
} from './styles';

export default function Announcement() {
  const [announcements, setAnnouncements] = useState([]);

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
    async function loadAnnouncements() {
      const response = await api.get('announcements/all');
      const { data } = response;

      setAnnouncements(data);
    }

    loadAnnouncements();
  }, []);

  async function searchAnnoucement(text) {
    if (text.length > 0) {
      const response = await api.get(`search/annoucement?query=${text}`);
      setAnnouncements(response.data);
    } else {
      const response = await api.get('announcements/all');
      setAnnouncements(response.data);
    }
  }

  return (
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
              searchAnnoucement(e.target.value);
            }}
          />
        </ContainerSearchInput>
      </ContainerSearch>
      <AnnouncementList>
        {announcements.map(announcement => (
          <li key={announcement.id}>
            <strong>{announcement.title}</strong>
            <p>{announcement.description}</p>
            <span>{announcement.whatsapp}</span>
          </li>
        ))}
      </AnnouncementList>
      {announcements.length === 0 && (
        <div
          style={{
            justifyContent: 'center',
            display: 'flex',
            textAlign: 'center',
          }}
        >
          <h1>Desculpe, não encontramos nenhum anúncio nesses requisitos.</h1>
        </div>
      )}
    </>
  );
}
