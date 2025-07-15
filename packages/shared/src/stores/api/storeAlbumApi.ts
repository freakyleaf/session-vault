import { baseApi } from '@shared-src/stores/api/storeBaseApi';

import type {
  IAlbum,
  ICreateUpdateAlbumRequest,
} from '@shared-src/lib/interfaces';
import type { TAlbumId } from '@shared-src/lib/types';

export const albumApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Public endpoints (no auth required)
    getPublicAlbum: builder.query<IAlbum, TAlbumId>({
      providesTags: (_result, _error, albumId) => [
        { id: albumId, type: 'Album' },
      ],
      query: (albumId) => `/albums/public/${albumId}`,
    }),

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

    // Authenticated endpoints
    // eslint-disable-next-line sort-keys
    createSingleAlbum: builder.mutation<IAlbum, ICreateUpdateAlbumRequest>({
      invalidatesTags: [{ id: 'LIST', type: 'Album' }],
      query: (albumData) => ({
        body: albumData,
        method: 'POST',
        url: '/albums/create',
      }),
    }),

    deleteSingleAlbum: builder.mutation<void, TAlbumId>({
      invalidatesTags: (_result, _error, albumId) => [
        { id: albumId, type: 'Album' },
        { id: 'LIST', type: 'Album' },
      ],
      query: (albumId) => ({
        method: 'DELETE',
        url: `/albums/${albumId}`,
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

    getSingleAlbum: builder.query<IAlbum, TAlbumId>({
      providesTags: (_result, _error, albumId) => [
        { id: albumId, type: 'Album' },
      ],
      query: (albumId) => `/albums/${albumId}`,
    }),

    updateSingleAlbum: builder.mutation<
      IAlbum,
      { albumId: TAlbumId; data: ICreateUpdateAlbumRequest }
    >({
      invalidatesTags: (_result, _error, { albumId }) => [
        { id: albumId, type: 'Album' },
        { id: 'LIST', type: 'Album' },
      ],
      query: ({ albumId, data }) => ({
        body: data,
        method: 'PUT',
        url: `/albums/${albumId}`,
      }),
    }),
  }),
});

export const {
  useCreateSingleAlbumMutation,
  useDeleteSingleAlbumMutation,
  useGetAllAlbumsQuery,
  useGetAllArtistAlbumsQuery,
  useGetPublicAlbumQuery,
  useGetPublicAlbumsQuery,
  useGetSingleAlbumQuery,
  useUpdateSingleAlbumMutation,
} = albumApi;
