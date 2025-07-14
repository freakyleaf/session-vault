import { useAuth } from '@clerk/clerk-react';

// Global token storage for RTK Query base query
let currentToken: string | null = null;

// Function to get the current auth token (used by baseQuery)
export const getCurrentAuthToken = () => currentToken;

// Hook to manage Clerk authentication state for RTK Query
export function useClerkRtkQuery() {
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
