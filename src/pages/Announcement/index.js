import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import { AnnouncementList } from './styles';

export default function Announcement() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    async function loadAnnouncements() {
      const response = await api.get('announcements/all');
      const { data } = response;

      setAnnouncements(data);
    }

    loadAnnouncements();
  }, []);

  return (
    <AnnouncementList>
      {announcements.map(announcement => (
        <li key={announcement.id}>
          <strong>{announcement.title}</strong>
          <p>{announcement.description}</p>
          <span>{announcement.whatsapp}</span>
        </li>
      ))}
    </AnnouncementList>
  );
}
