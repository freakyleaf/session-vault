import { AlbumApiService } from '@shared-src/services/sxAlbumApiService';

import { API_BASE_URL } from '@shared-src/lib/constants';

function useAlbumApi(): AlbumApiService {
  const albumApi = useMemo(() => {
    if (!API_BASE_URL) {
      throw new Error('API_BASE_URL is not configured');
    }

    return new AlbumApiService({
      baseUrl: API_BASE_URL as string,
      // No `getAuthHeaders()` required for public access
    });
  }, []);

  return albumApi;
}

export { useAlbumApi };
