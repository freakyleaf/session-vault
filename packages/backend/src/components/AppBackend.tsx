import { BrowserRouter, Route, Routes } from 'react-router';

import LayoutDefault from '@backend-src/layouts/LayoutDefault';

import PageAlbums from '@backend-src/pages/PageAlbums';
import PageArtists from '@backend-src/pages/PageArtists';
import PageHome from '@backend-src/pages/PageHome';
import PageNotFound from '@backend-src/pages/PageNotFound';
import PageSessions from '@backend-src/pages/PageSessions';
import PageSongs from '@backend-src/pages/PageSongs';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

function AppBackend() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<LayoutDefault />}
          path="/"
        >
          <Route
            element={<PageHome />}
            index
          />
          <Route
            element={<PageAlbums />}
            path="albums"
          />
          <Route
            element={<PageArtists />}
            path="artists"
          />
          <Route
            element={<PageSessions />}
            path="sessions"
          />
          <Route
            element={<PageSongs />}
            path="songs"
          />

          <Route
            element={<PageNotFound />}
            path="*"
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppBackend;
