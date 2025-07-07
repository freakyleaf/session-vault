import { BrowserRouter, Route, Routes } from 'react-router';

import BxLayoutDefault from '@backend-root/src/layouts/BxLayoutDefault';

import BxPageAlbums from '@backend-src/pages/BxPageAlbums';
import BxPageArtists from '@backend-src/pages/BxPageArtists';
import BxPageHome from '@backend-src/pages/BxPageHome';
import BxPageNotFound from '@backend-src/pages/BxPageNotFound';
import BxPageSessions from '@backend-src/pages/BxPageSessions';
import BxPageSongs from '@backend-src/pages/BxPageSongs';

import BxRouteGuardAdmin from '@backend-src/components/BxRouteGuardAdmin';
import BxRouteGuardAuthenticated from '@backend-src/components/BxRouteGuardAuthenticated';

function AppBackend() {
  return (
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
              element={<BxPageAlbums />}
              path="albums"
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
              element={<BxPageSessions />}
              path="sessions"
            />
            <Route
              element={<BxPageSongs />}
              path="songs"
            />
          </Route>
          <Route
            element={<BxPageNotFound />}
            path="*"
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppBackend;
