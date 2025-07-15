import { useAuth } from '@clerk/clerk-react';

let currentToken: string | null = null;

export const getCurrentAuthToken = () => currentToken;

export function useClerkAuth() {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const updateToken = async () => {
      try {
        if (isSignedIn) {
          const token = await getToken();
          currentToken = token;
        } else {
          currentToken = null;
        }
      } catch (error) {
        console.error('Failed to get auth token:', error);
        currentToken = null;
      }
    };

    void updateToken();
  }, [getToken, isSignedIn]);

  // Clear token on unmount or when signed out
  useEffect(() => {
    return () => {
      if (!isSignedIn) {
        currentToken = null;
      }
    };
  }, [isSignedIn]);
}
