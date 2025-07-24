import { createContext } from 'react';

import { useAuth, useUser } from '@clerk/clerk-react';

import { useClerkUserRole } from '@backend-src/hooks/bxUseClerkUserRole';
import { useToast } from '@backend-src/hooks/bxUseToast';

import { getBaseUrl } from '@backend-src/lib/utils/bxGetBaseUrl';

import { ID_TYPE_CLERK } from '@shared-root/src/lib/constants';

import type { IArtist } from '@shared-src/lib/interfaces';
import type { ReactNode } from 'react';

const { baseUrl } = getBaseUrl();

interface IArtistContext {
  artist: IArtist | null;
  isLoadingProfile: boolean;
  isEditing: boolean;
  profileSetupRequired: boolean;
  refetchArtist: () => void;
  setArtist: (artist: IArtist | null) => void;
  clearProfileSetupRequired: () => void;
}

const ArtistContext = createContext<IArtistContext | undefined>(undefined);

interface BxArtistProviderProps {
  children: ReactNode;
}

export function BxArtistProvider({ children }: BxArtistProviderProps) {
  const { getToken } = useAuth();
  const { isLoaded, user } = useUser();
  const { isArtist } = useClerkUserRole();
  const { showErrorToast } = useToast();

  const [artist, setArtist] = useState<IArtist | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [profileSetupRequired, setProfileSetupRequired] = useState(false);

  const fetchInProgressRef = useRef(false);

  const getHeaders = useCallback(async () => {
    const token = await getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }, [getToken]);

  const fetchArtistProfile = useCallback(async () => {
    if (!isArtist || !isLoaded || !user?.id || fetchInProgressRef.current) {
      return;
    }

    fetchInProgressRef.current = true;
    setIsLoadingProfile(true);

    try {
      const headers = await getHeaders();
      const response = await fetch(
        `${baseUrl}/artists/${user.id}?idType=${ID_TYPE_CLERK}`,
        {
          headers,
        },
      );

      if (response.ok) {
        const artistData = (await response.json()) as IArtist;

        if (artistData) {
          setArtist(artistData);
        }
      } else if (response.status === 404) {
        setProfileSetupRequired(true);
      }
    } catch {
      showErrorToast('Failed to load artist');
    } finally {
      fetchInProgressRef.current = false;
      setIsLoadingProfile(false);
    }
  }, [getHeaders, isArtist, isLoaded, showErrorToast, user]);

  useEffect(() => {
    if (isArtist && isLoaded && user?.id) {
      void fetchArtistProfile();
    } else if (!isArtist && isLoaded) {
      setArtist(null);
      setIsLoadingProfile(false);
      setProfileSetupRequired(false);
    }
  }, [fetchArtistProfile, isArtist, isLoaded, user]);

  const isEditing = Boolean(artist);

  const clearProfileSetupRequired = useCallback(() => {
    setProfileSetupRequired(false);
  }, []);

  const value: IArtistContext = {
    artist,
    clearProfileSetupRequired,
    isEditing,
    isLoadingProfile,
    profileSetupRequired,
    refetchArtist: () => {
      void fetchArtistProfile();
    },
    setArtist,
  };

  return (
    <ArtistContext.Provider value={value}>{children}</ArtistContext.Provider>
  );
}

export { ArtistContext };
export type { IArtistContext };
