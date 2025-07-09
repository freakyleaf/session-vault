import { usePageTitle } from '@backend-src/hooks/bxUsePageTitle';

function BxPageSongs() {
  usePageTitle('Songs');

  return (
    <div className="bx-page bx-page--songs">
      <h1>Songs</h1>
    </div>
  );
}

export default BxPageSongs;
