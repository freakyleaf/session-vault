import { BrowserRouter, Route, Routes } from 'react-router';

import { Toast } from 'primereact/toast';

import { useToast } from '@backend-src/hooks/bxUseToast';

import BxLayoutDefault from '@backend-src/layouts/BxLayoutDefault';

import BxPageAllAlbums from '@backend-root/src/pages/BxPageAllAlbums';
import BxPageArtists from '@backend-src/pages/BxPageArtists';
import BxPageHome from '@backend-src/pages/BxPageHome';
import BxPageNotFound from '@backend-src/pages/BxPageNotFound';
import BxPageSessions from '@backend-src/pages/BxPageSessions';
import BxPageSingleAlbum from '@backend-src/pages/BxPageSingleAlbum';
import BxPageSongs from '@backend-src/pages/BxPageSongs';

import BxRouteGuardAdmin from '@backend-src/components/BxRouteGuardAdmin';
import BxRouteGuardAuthenticated from '@backend-src/components/BxRouteGuardAuthenticated';

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
      <Toast ref={toast} />
    </>
  );
}

export default BxAppBackend;
