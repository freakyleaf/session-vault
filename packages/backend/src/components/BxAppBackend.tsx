import { BrowserRouter, Route, Routes } from 'react-router';

import { Toast } from 'primereact/toast';

import { useToast } from '@backend-src/hooks/bxUseToast';

import BxLayoutDefault from '@backend-src/layouts/BxLayoutDefault';

import BxPageAllAlbums from '@backend-root/src/pages/BxPageAllAlbums';
import BxPageArtists from '@backend-src/pages/BxPageArtists';
import BxPageHome from '@backend-src/pages/BxPageHome';
import BxPageNotFound from '@backend-src/pages/BxPageNotFound';
import BxPageProfile from '@backend-src/pages/BxPageProfile';
import BxPageSessions from '@backend-src/pages/BxPageSessions';
import BxPageSettings from '@backend-src/pages/BxPageSettings';
import BxPageSingleAlbum from '@backend-src/pages/BxPageSingleAlbum';
import BxPageSongs from '@backend-src/pages/BxPageSongs';

function BxAppBackend() {
  const { toast } = useToast();

  return (
    <>
      <BrowserRouter>
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
              <Route
                element={<BxPageAllAlbums />}
                path="albums"
              />
              <Route
                element={<BxPageSingleAlbum />}
                path="albums/:id"
              />
              <Route
                element={
                  <BxRouteGuardAdmin>
                    <BxPageArtists />
                  </BxRouteGuardAdmin>
                }
                path="artists"
              />
              <Route
                element={<BxRouteGuardArtistCredentials />}
                path="/"
              >
                <Route
                  element={<BxPageSessions />}
                  path="sessions"
                />
                <Route
                  element={<BxPageSongs />}
                  path="songs"
                />
              </Route>
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
