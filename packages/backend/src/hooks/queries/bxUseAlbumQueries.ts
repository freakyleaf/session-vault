import { useQuery } from '@tanstack/react-query';

import { fetchWithAuth } from '@backend-src/lib/utils/bxFetchWithAuth';
import { getBaseUrl } from '@backend-src/lib/utils/bxGetBaseUrl';

import { useAuthHeaders } from '@backend-src/hooks/bxUseAuthHeaders';

import { ALBUM_QUERY_KEYS } from '@backend-src/lib/queryKeys/bxAlbumQueryKeys';

import type { IAlbum } from '@shared-src/lib/interfaces';

const { baseUrl } = getBaseUrl();

export const useGetAllAdminAlbums = ({ isEnabled }: { isEnabled: boolean }) => {
  const getHeaders = useAuthHeaders();

  return useQuery({
    enabled: isEnabled,
    queryFn: async () => {
      const headers = await getHeaders();
      return fetchWithAuth({
        options: { headers },
        url: `${baseUrl}/albums/admin/all`,
      }) as Promise<IAlbum[]>;
    },
    queryKey: ALBUM_QUERY_KEYS.all,
  });
};

export const useGetAllArtistAlbums = ({
  isEnabled,
}: {
  isEnabled: boolean;
}) => {
  const getHeaders = useAuthHeaders();

  return useQuery({
    enabled: isEnabled,
    queryFn: async () => {
      const headers = await getHeaders();
      return fetchWithAuth({
        options: { headers },
        url: `${baseUrl}/albums/artist/all`,
      }) as Promise<IAlbum[]>;
    },
    queryKey: ALBUM_QUERY_KEYS.artist,
  });
};

export const useGetSingleAlbum = ({ id }: { id: string }) => {
  const getHeaders = useAuthHeaders();

  return useQuery({
    queryFn: async () => {
      const headers = await getHeaders();
      return fetchWithAuth({
        options: { headers },
        url: `${baseUrl}/albums/${id}`,
      }) as Promise<IAlbum>;
    },
    queryKey: ALBUM_QUERY_KEYS.single(id),
  });
};
