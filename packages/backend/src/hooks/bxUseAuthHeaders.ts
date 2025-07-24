import { useAuth } from '@clerk/clerk-react';

export const useAuthHeaders = () => {
  const { getToken } = useAuth();

  return useCallback(async () => {
    const token = await getToken();

    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }, [getToken]);
};
