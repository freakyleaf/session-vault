import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@shared-src/stores/api/storeBaseApi';

import { ENVIRONMENT_PRODUCTION } from '@shared-root/src/lib/constants';

export const store = configureStore({
  devTools: process.env.NODE_ENV !== ENVIRONMENT_PRODUCTION,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [baseApi.util.resetApiState.type],
        ignoredActionsPaths: ['meta.arg', 'payload.timestamp'],
      },
    }).concat(baseApi.middleware),
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
