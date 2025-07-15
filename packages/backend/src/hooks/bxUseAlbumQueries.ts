import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';

import { API_BASE_URL } from '@shared-src/lib/constants';

import type {
  IAlbum,
  ICreateUpdateAlbumRequest,
} from '@shared-src/lib/interfaces';

const BASE_URL = `${import.meta.env.VITE_API_ROOT_URL}:${
  import.meta.env.VITE_API_ROOT_PORT
}${API_BASE_URL}`;

const QUERY_KEYS = {
  albums: {
    all: ['albums', 'all'] as const,
    artist: ['albums', 'artist'] as const,
    single: (id: string) => ['albums', id] as const,
  },
} as const;

const useAuthHeaders = () => {
  const { getToken } = useAuth();

  return useCallback(async () => {
    const token = await getToken();

    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }, [getToken]);
};

const fetchWithAuth = async ({
  options: { headers, ...options } = {},
  url,
}: {
  options?: RequestInit;
  url: string;
}): Promise<unknown> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json() as Promise<unknown>;
};

export const useGetAllAdminAlbums = (enabled = true) => {
  const getHeaders = useAuthHeaders();

  return useQuery({
    enabled,
    queryFn: async () => {
      const headers = await getHeaders();
      return fetchWithAuth({
        options: { headers },
        url: `${BASE_URL}/albums/admin`,
      }) as Promise<IAlbum[]>;
    },
    queryKey: QUERY_KEYS.albums.all,
  });
};

export const useGetAllArtistAlbums = (enabled = true) => {
  const getHeaders = useAuthHeaders();

  return useQuery({
    enabled,
    queryFn: async () => {
      const headers = await getHeaders();
      return fetchWithAuth({
        options: { headers },
        url: `${BASE_URL}/albums/artist`,
      }) as Promise<IAlbum[]>;
    },
    queryKey: QUERY_KEYS.albums.artist,
  });
};

export const useGetSingleAlbum = (id: string) => {
  const getHeaders = useAuthHeaders();

  return useQuery({
    enabled: !!id,
    queryFn: async () => {
      const headers = await getHeaders();
      return fetchWithAuth({
        options: { headers },
        url: `${BASE_URL}/albums/${id}`,
      }) as Promise<IAlbum>;
    },
    queryKey: QUERY_KEYS.albums.single(id),
  });
};

export const useCreateAlbum = () => {
  const queryClient = useQueryClient();
  const getHeaders = useAuthHeaders();

  return useMutation({
    mutationFn: async (albumData: ICreateUpdateAlbumRequest) => {
      const headers = await getHeaders();
      return fetchWithAuth({
        options: {
          body: JSON.stringify(albumData),
          headers,
          method: 'POST',
        },
        url: `${BASE_URL}/albums/create`,
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['albums'] });
    },
  });
};

export const useUpdateAlbum = () => {
  const queryClient = useQueryClient();
  const getHeaders = useAuthHeaders();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: ICreateUpdateAlbumRequest;
    }) => {
      const headers = await getHeaders();
      return fetchWithAuth({
        options: {
          body: JSON.stringify(data),
          headers,
          method: 'PUT',
        },
        url: `${BASE_URL}/albums/${id}`,
      });
    },
    onSuccess: (_, { id }) => {
      void queryClient.invalidateQueries({ queryKey: ['albums'] });
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.albums.single(id),
      });
    },
  });
};

export const useDeleteSingleAlbum = () => {
  const queryClient = useQueryClient();
  const getHeaders = useAuthHeaders();

  return useMutation({
    mutationFn: async (id: string) => {
      const headers = await getHeaders();
      return fetchWithAuth({
        options: {
          headers,
          method: 'DELETE',
        },
        url: `${BASE_URL}/albums/${id}`,
      });
    },
    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({ queryKey: ['albums'] });
      void queryClient.removeQueries({
        queryKey: QUERY_KEYS.albums.single(id),
      });
    },
  });
};
