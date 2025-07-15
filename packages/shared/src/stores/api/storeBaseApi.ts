import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '@shared-src/lib/constants';

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

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
  tagTypes: ['Album', 'Song', 'Artist'],
});
