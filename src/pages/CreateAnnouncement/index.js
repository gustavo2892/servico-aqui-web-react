import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import history from '~/services/history';

function CreateAnnouncement() {
  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    if (profile.provider) {
      history.push('/dashboard');
    }
  }, [profile]);

  return <div>Tela que o cliente pode criar anuncio</div>;
}

export default CreateAnnouncement;
