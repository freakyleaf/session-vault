import { usePageTitle } from '@backend-src/hooks/usePageTitle';

function BxPageAlbums() {
  usePageTitle('Albums');

  return (
    <div className="bx-page bx-page--albums">
      <h1>Albums</h1>
    </div>
  );
}

export default BxPageAlbums;
