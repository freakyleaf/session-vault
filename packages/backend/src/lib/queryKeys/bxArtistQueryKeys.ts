export const ARTIST_QUERY_KEYS = {
  all: ['artists', 'all'] as const,
  artist: ['artists', 'artist'] as const,
  single: (id: string) => ['artists', id] as const,
} as const;
