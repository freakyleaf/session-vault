import { BrowserRouter, Route, Routes } from 'react-router';

import LayoutDefault from '@backend/layouts/LayoutDefault';

import PageAlbums from '@backend/pages/PageAlbums';
import PageArtists from '@backend/pages/PageArtists';
import PageHome from '@backend/pages/PageHome';
import PageNotFound from '@backend/pages/PageNotFound';
import PageSessions from '@backend/pages/PageSessions';
import PageSongs from '@backend/pages/PageSongs';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

function BackendApp() {
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

export default BackendApp;
