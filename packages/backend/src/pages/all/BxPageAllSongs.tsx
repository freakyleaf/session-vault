import { usePageTitle } from '@backend-src/hooks/bxUsePageTitle';

function BxPageAllSongs() {
  usePageTitle('Songs');

  return (
    <div className="bx-page bx-page--all-songs">
      <h1>Songs</h1>
    </div>
  );
}

export default BxPageAllSongs;
