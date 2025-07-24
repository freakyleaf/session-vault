import { useEffect } from 'react';

import { useNavigate } from 'react-router';

import { useArtist } from '@backend-src/hooks/bxUseArtist';

function BxArtistRedirectHandler() {
  const navigate = useNavigate();
  const { profileSetupRequired, clearProfileSetupRequired } = useArtist();

  useEffect(() => {
    if (profileSetupRequired) {
      clearProfileSetupRequired();
      void navigate('/settings/profile');
    }
  }, [profileSetupRequired, clearProfileSetupRequired, navigate]);

  return null;
}

export default BxArtistRedirectHandler;
