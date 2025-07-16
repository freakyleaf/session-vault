import { API_BASE_URL } from '@shared-src/lib/constants';

export function getBaseUrl() {
  const baseUrl = `${import.meta.env.VITE_API_ROOT_URL}:${
    import.meta.env.VITE_API_ROOT_PORT
  }${API_BASE_URL}`;

  return { baseUrl };
}
