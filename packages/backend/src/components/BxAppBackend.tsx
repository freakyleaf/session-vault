import { BrowserRouter, Route, Routes } from 'react-router';

import { Toast } from 'primereact/toast';

import { useGlobalLoading } from '@backend-src/hooks/bxUseGlobalLoading';
import { useToast } from '@backend-src/hooks/bxUseToast';

import BxArtistRedirectHandler from '@backend-src/components/BxArtistRedirectHandler';
import BxLayoutDefault from '@backend-src/layouts/BxLayoutDefault';

import BxPageAllAlbums from '@backend-src/pages/all/BxPageAllAlbums';
import BxPageAllArtists from '@backend-src/pages/all/BxPageAllArtists';
import BxPageAllSessions from '@backend-src/pages/all/BxPageAllSessions';
import BxPageAllSongs from '@backend-src/pages/all/BxPageAllSongs';
import BxPageHome from '@backend-src/pages/BxPageHome';
import BxPageNotFound from '@backend-src/pages/BxPageNotFound';
import BxPageProfile from '@backend-src/pages/BxPageProfile';
import BxPageSettings from '@backend-src/pages/BxPageSettings';
import BxPageSingleAlbum from '@backend-src/pages/single/BxPageSingleAlbum';
import BxPageSingleArtist from '@backend-src/pages/single/BxPageSingleArtist';

function BxAppBackend() {
  const { toast } = useToast();
  useGlobalLoading();

  return (
    <>
      <BrowserRouter>
        <BxArtistRedirectHandler />
        <Routes>
          <Route
            element={<BxLayoutDefault />}
            path="/"
          >
            <Route
              element={<BxPageHome />}
              index
            />
            <Route
              element={<BxRouteGuardAuthenticated />}
              path="/"
            >
              <Route element={<BxRouteGuardArtistActive />}>
                <Route
                  element={<BxAdminDataFetcher />}
                  path="/"
                >
                  <Route
                    element={<BxPageAllAlbums />}
                    path="albums"
                  />
                  <Route
                    element={<BxPageSingleAlbum />}
                    path="albums/:id"
                  />
                </Route>
                <Route
                  element={<BxRouteGuardAdmin />}
                  path="/artists"
                >
                  <Route
                    element={<BxPageAllArtists />}
                    index
                  />
                  <Route
                    element={<BxPageSingleArtist />}
                    path=":id"
                  />
                </Route>
                <Route
                  element={<BxRouteGuardArtistCredentials />}
                  path="/"
                >
                  <Route
                    element={<BxPageAllSessions />}
                    path="sessions"
                  />
                  <Route
                    element={<BxPageAllSongs />}
                    path="songs"
                  />
                </Route>
              </Route>
            </Route>
            <Route element={<BxRouteGuardArtistActive />}>
              <Route
                element={<BxPageSettings />}
                path="settings"
              />
              <Route
                element={<BxPageProfile />}
                path="settings/profile"
              />
            </Route>
            <Route
              element={<BxPageNotFound />}
              path="*"
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toast ref={toast} />
    </>
  );
}

export default BxAppBackend;
