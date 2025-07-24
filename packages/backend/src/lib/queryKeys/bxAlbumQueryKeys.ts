export const ALBUM_QUERY_KEYS = {
  all: ['albums', 'all'] as const,
  artist: ['albums', 'artist'] as const,
  single: (id: string) => ['albums', id] as const,
} as const;
