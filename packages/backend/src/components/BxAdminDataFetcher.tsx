import { Outlet } from 'react-router';

import { useClerkUserRole } from '@backend-src/hooks/bxUseClerkUserRole';
import { useGetAllArtists } from '@backend-src/hooks/queries/bxUseArtistQueries';

import { useArtistStore } from '@backend-src/stores/bxArtistStore';

function BxAdminDataFetcher() {
  const { isAdmin } = useClerkUserRole();
  const { setArtists } = useArtistStore();
  const { data: artists } = useGetAllArtists({ isEnabled: isAdmin });

  useEffect(() => {
    if (artists && isAdmin) {
      setArtists(artists);
    }
  }, [artists, isAdmin, setArtists]);

  return <Outlet />;
}

export default BxAdminDataFetcher;
