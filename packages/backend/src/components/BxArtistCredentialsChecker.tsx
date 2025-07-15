import { useDispatch } from 'react-redux';
import { useUser } from '@clerk/clerk-react';

import {
  setIsCheckingArtistCredentials,
  setUserArtistCredentials,
} from '@shared-src/stores/userSlice';

import { useGetArtistQuery } from '@shared-src/stores/api/storeArtistApi';

const ArtistCredentialsChecker = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetArtistQuery(user?.id || '', {
    skip: !user?.id,
  });

  useEffect(() => {
    dispatch(setIsCheckingArtistCredentials(isLoading));
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (data) {
      dispatch(
        setUserArtistCredentials({
          artist: data,
          hasArtistCredentials: !!data,
        }),
      );
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      console.error('Error checking artist credentials:', error);
      dispatch(
        setUserArtistCredentials({
          artist: null,
          hasArtistCredentials: false,
        }),
      );
    }
  }, [dispatch, error]);

  return null;
};

export default ArtistCredentialsChecker;
