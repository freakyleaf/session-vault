import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '@shared-src/lib/constants';

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import type {
  IAlbum,
  ICreateUpdateAlbumRequest,
} from '@shared-src/lib/interfaces';

const apiRootPort = import.meta.env.VITE_API_ROOT_PORT as string;
const apiRootUrl = import.meta.env.VITE_API_ROOT_URL as string;

let tokenGetter: (() => Promise<string | null>) | null = null;

export const setAuthTokenGetter = (getToken: () => Promise<string | null>) => {
  tokenGetter = getToken;
};

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `${apiRootUrl}:${apiRootPort}${API_BASE_URL}`,
    prepareHeaders: async (headers) => {
      headers.set('Content-Type', 'application/json');

      if (tokenGetter) {
        try {
          const token = await tokenGetter();
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
          }
        } catch (error) {
          console.warn('Failed to get auth token:', error);
        }
      }

      return headers;
    },
  });

  return baseQuery(args, api, extraOptions);
};

export const baseApi = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  keepUnusedDataFor: 60, // Keep cached data for 60 seconds
  reducerPath: 'api',
  refetchOnMountOrArgChange: 30, // Refetch if data is older than 30 seconds
  tagTypes: ['Album', 'Song', 'User'],
});

// Album API endpoints
export const albumApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Public endpoints (no auth required)
    getPublicAlbum: builder.query<IAlbum, string>({
      providesTags: (_result, _error, id) => [{ id, type: 'Album' }],
      query: (id) => `/albums/public/${id}`,
    }),

    // Allow RTK Query to surgically update specific albums without refetching the entire list
    getPublicAlbums: builder.query<IAlbum[], void>({
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ id: _id, type: 'Album' } as const)),
              { id: 'LIST', type: 'Album' },
            ]
          : [{ id: 'LIST', type: 'Album' }],
      query: () => '/albums/public',
    }),

    // Authenticated endpoints (auth automatically included)
    // eslint-disable-next-line sort-keys
    createSingleAlbum: builder.mutation<IAlbum, ICreateUpdateAlbumRequest>({
      invalidatesTags: [{ id: 'LIST', type: 'Album' }],
      query: (albumData) => ({
        body: albumData,
        method: 'POST',
        url: '/albums/create',
      }),
    }),

    deleteSingleAlbum: builder.mutation<void, string>({
      invalidatesTags: (_result, _error, id) => [
        { id, type: 'Album' },
        { id: 'LIST', type: 'Album' },
      ],
      query: (id) => ({
        method: 'DELETE',
        url: `/albums/${id}`,
      }),
    }),

    getAllAlbums: builder.query<IAlbum[], void>({
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ id: _id, type: 'Album' } as const)),
              { id: 'LIST', type: 'Album' },
            ]
          : [{ id: 'LIST', type: 'Album' }],
      query: () => '/albums/all',
    }),

    getAllArtistAlbums: builder.query<IAlbum[], void>({
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ id: _id, type: 'Album' } as const)),
              { id: 'LIST', type: 'Album' },
            ]
          : [{ id: 'LIST', type: 'Album' }],
      query: () => '/albums',
    }),

    getSingleAlbum: builder.query<IAlbum, string>({
      providesTags: (_result, _error, id) => [{ id, type: 'Album' }],
      query: (id) => `/albums/${id}`,
    }),

    updateSingleAlbum: builder.mutation<
      IAlbum,
      { data: ICreateUpdateAlbumRequest; id: string }
    >({
      invalidatesTags: (_result, _error, { id }) => [
        { id, type: 'Album' },
        { id: 'LIST', type: 'Album' },
      ],
      query: ({ data, id }) => ({
        body: data,
        method: 'PUT',
        url: `/albums/${id}`,
      }),
    }),
  }),
});

export const {
  useCreateSingleAlbumMutation,
  useDeleteSingleAlbumMutation,
  useGetSingleAlbumQuery,
  useGetAllAlbumsQuery,
  useGetPublicAlbumQuery,
  useGetPublicAlbumsQuery,
  useGetAllArtistAlbumsQuery,
  useUpdateSingleAlbumMutation,
} = albumApi;
