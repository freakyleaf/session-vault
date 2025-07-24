import { create } from 'zustand';
import { mountStoreDevtool  } from 'simple-zustand-devtools';

import { ENVIRONMENT_DEVELOPMENT } from '@shared-root/src/lib/constants';

import type { ILoadingStore } from '@shared-src/lib/interfaces';

const useLoadingStore = create<ILoadingStore>()((set) => ({
  isGlobalLoading: false,
  setIsGlobalLoading: (value) => set({ isGlobalLoading: value }),
}));

if (process.env.NODE_ENV === ENVIRONMENT_DEVELOPMENT) {
  mountStoreDevtool('Loading Store', useLoadingStore);
}

export { useLoadingStore };
