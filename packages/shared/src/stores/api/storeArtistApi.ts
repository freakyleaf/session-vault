import { baseApi } from './storeBaseApi';

import type {
  IArtist,
  ICreateUpdateArtistRequest,
} from '@shared-src/lib/interfaces';
import type { TArtistId } from '@shared-src/lib/types';

export const artistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createArtist: builder.mutation<IArtist, ICreateUpdateArtistRequest>({
      invalidatesTags: (_result, _error, { clerkId }) => [
        { id: clerkId, type: 'Artist' },
      ],
      query: (artistData) => ({
        body: artistData,
        method: 'POST',
        url: `/artists/create`,
      }),
    }),

    getArtist: builder.query<IArtist, TArtistId>({
      providesTags: (_result, _error, clerkId) => [{ clerkId, type: 'Artist' }],
      query: (clerkId) => `/artists/${clerkId}`,
    }),

    updateArtist: builder.mutation<
      IArtist,
      { artistId: string; data: ICreateUpdateArtistRequest }
    >({
      invalidatesTags: (_result, _error, { artistId }) => [
        { id: artistId, type: 'Artist' },
      ],
      query: ({ artistId, data }) => ({
        body: data,
        method: 'PUT',
        url: `/artists/${artistId}`,
      }),
    }),
  }),
});

export const {
  useCreateArtistMutation,
  useGetArtistQuery,
  useUpdateArtistMutation,
} = artistApi;
