import { useContext } from 'react';

import { ArtistContext } from '@backend-src/providers/BxArtistProvider';

import type { IArtistContext } from '@backend-src/providers/BxArtistProvider';

export function useArtist(): IArtistContext {
  const context = useContext(ArtistContext);
  if (context === undefined) {
    throw new Error('useArtist must be used within a BxArtistProvider');
  }
  return context;
}
