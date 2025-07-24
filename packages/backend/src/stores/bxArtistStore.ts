import { create } from 'zustand';
import { mountStoreDevtool  } from 'simple-zustand-devtools';

import { ENVIRONMENT_DEVELOPMENT } from '@shared-root/src/lib/constants';

import type { IArtistStore } from '@shared-src/lib/interfaces';

const useArtistStore = create<IArtistStore>()((set) => ({
  artists: null,
  clearArtists: () => set({ artists: null }),
  setArtists: (value) => set({ artists: value }),
}));

if (process.env.NODE_ENV === ENVIRONMENT_DEVELOPMENT) {
  mountStoreDevtool('Artist Store', useArtistStore);
}

export { useArtistStore };
