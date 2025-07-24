import { useQuery } from '@tanstack/react-query';

import { fetchWithAuth } from '@backend-src/lib/utils/bxFetchWithAuth';
import { getBaseUrl } from '@backend-src/lib/utils/bxGetBaseUrl';

import { useAuthHeaders } from '@backend-src/hooks/bxUseAuthHeaders';

import { ARTIST_QUERY_KEYS } from '@backend-src/lib/queryKeys/bxArtistQueryKeys';

import type { IArtist } from '@shared-src/lib/interfaces';
import type { TIdType } from '@shared-src/lib/types';

const { baseUrl } = getBaseUrl();

export const useGetAllArtists = ({ isEnabled }: { isEnabled: boolean }) => {
  const getHeaders = useAuthHeaders();

  return useQuery({
    enabled: isEnabled,
    queryFn: async () => {
      const headers = await getHeaders();
      return fetchWithAuth({
        options: { headers },
        url: `${baseUrl}/artists/all`,
      }) as Promise<IArtist[]>;
    },
    queryKey: ARTIST_QUERY_KEYS.all,
  });
};

export const useGetSingleArtist = ({
  id,
  idType,
}: {
  id: string;
  idType: TIdType;
}) => {
  const getHeaders = useAuthHeaders();

  return useQuery({
    queryFn: async () => {
      const headers = await getHeaders();
      return fetchWithAuth({
        options: { headers },
        params: { idType },
        url: `${baseUrl}/artists/${id}`,
      }) as Promise<IArtist>;
    },
    queryKey: ARTIST_QUERY_KEYS.single(id),
  });
};
