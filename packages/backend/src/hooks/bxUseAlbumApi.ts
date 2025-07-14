import { useAuth } from '@clerk/clerk-react';

import { AlbumApiService } from '@shared-src/services/sxAlbumApiService';

import { API_BASE_URL } from '@shared-src/lib/constants';

function useAlbumApi(): AlbumApiService {
  const { getToken } = useAuth();

  const getAuthHeaders = useCallback(async () => {
    try {
      const token = await getToken();

      if (!token) {
        throw new Error('No authentication token available');
      }

      return {
        Authorization: `Bearer ${token}`,
      };
    } catch (error) {
      console.error('Failed to get auth headers:', error);
      throw error;
    }
  }, [getToken]);

  const albumApi = useMemo(() => {
    if (!API_BASE_URL) {
      throw new Error('API_BASE_URL is not configured');
    }

    return new AlbumApiService({
      baseUrl: API_BASE_URL,
      getAuthHeaders,
    });
  }, [getAuthHeaders]);

  return albumApi;
}

export { useAlbumApi };
