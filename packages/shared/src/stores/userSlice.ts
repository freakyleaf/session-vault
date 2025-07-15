import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { IArtist } from '@shared-src/lib/interfaces';

interface UserState {
  artist: IArtist | null;
  hasArtistCredentials: boolean;
  isCheckingArtistCredentials: boolean;
}

const initialState: UserState = {
  artist: null,
  hasArtistCredentials: false,
  isCheckingArtistCredentials: false,
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    resetUserState: () => initialState,
    setIsCheckingArtistCredentials: (state, action: PayloadAction<boolean>) => {
      state.isCheckingArtistCredentials = action.payload;
    },
    setUserArtistCredentials: (
      state,
      action: PayloadAction<{
        artist: IArtist | null;
        hasArtistCredentials: boolean;
      }>,
    ) => {
      state.artist = action.payload.artist;
      state.hasArtistCredentials = action.payload.hasArtistCredentials;
    },
  },
});

export const {
  setUserArtistCredentials,
  setIsCheckingArtistCredentials,
  resetUserState,
} = userSlice.actions;
export default userSlice.reducer;
