import { useQuery } from '@tanstack/react-query';

import { API_BASE_URL } from '@shared-src/lib/constants';

const apiRootPort = import.meta.env.VITE_API_ROOT_PORT as string;
const apiRootUrl = import.meta.env.VITE_API_ROOT_URL as string;
const baseUrl = `${apiRootUrl}:${apiRootPort}${API_BASE_URL}`;

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
