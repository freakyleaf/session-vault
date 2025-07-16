import { useQuery } from '@tanstack/react-query';

import { getBaseUrl } from '@frontend-src/lib/utils/fxGetBaseUrl';

const { baseUrl } = getBaseUrl();

const fetchWithoutAuth = async (url: string): Promise<unknown> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json() as Promise<unknown>;
};

export const useGetPublicAlbums = () => {
  return useQuery({
    queryFn: () => fetchWithoutAuth(`${baseUrl}/albums/public`),
    queryKey: ['albums', 'public'],
  });
};

export const useGetPublicAlbum = (id: string) => {
  return useQuery({
    enabled: !!id,
    queryFn: () => fetchWithoutAuth(`${baseUrl}/albums/public/${id}`),
    queryKey: ['albums', 'public', id],
  });
};
