import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { useUser } from '@clerk/clerk-react';

import { useLoadingStore } from '@backend-src/stores/bxLoadingStore';

export const useGlobalLoading = () => {
  const { setIsGlobalLoading } = useLoadingStore();

  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const { isLoaded } = useUser();

  useEffect(() => {
    const isLoading = isFetching > 0 || isMutating > 0 || !isLoaded;

    setIsGlobalLoading(isLoading);
  }, [isFetching, isMutating, isLoaded, setIsGlobalLoading]);
};
