import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { ILoadingStore } from '@shared-src/lib/interfaces';

const useLoadingStore = create<ILoadingStore>()(
  devtools(
    (set) => ({
      isGlobalLoading: true,
      setIsGlobalLoading: (value) => set({ isGlobalLoading: value }),
    }),
    {
      name: 'loading-store',
    },
  ),
);

useLoadingStore.devtools.cleanup();

export { useLoadingStore };
