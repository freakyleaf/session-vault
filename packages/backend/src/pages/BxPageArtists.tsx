import { usePageTitle } from '@backend-src/hooks/usePageTitle';

function BxPageArtists() {
  usePageTitle('Artists');

  return (
    <div className="bx-page bx-page--artists">
      <h1>Artists</h1>
    </div>
  );
}

export default BxPageArtists;
