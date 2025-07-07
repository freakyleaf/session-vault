import { BrowserRouter, Route, Routes } from 'react-router';

import LayoutDefault from '@backend-src/layouts/LayoutDefault';

import BxPageAlbums from '@backend-src/pages/BxPageAlbums';
import BxPageArtists from '@backend-src/pages/BxPageArtists';
import BxPageHome from '@backend-src/pages/BxPageHome';
import BxPageNotFound from '@backend-src/pages/BxPageNotFound';
import BxPageSessions from '@backend-src/pages/BxPageSessions';
import BxPageSongs from '@backend-src/pages/BxPageSongs';

function AppBackend() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<LayoutDefault />}
          path="/"
        >
          <Route
            element={<BxPageHome />}
            index
          />
          <Route
            element={<BxPageAlbums />}
            path="albums"
          />
          <Route
            element={<BxPageArtists />}
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
