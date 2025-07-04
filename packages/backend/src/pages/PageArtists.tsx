import { usePageTitle } from '@backend/hooks/usePageTitle';

function PageArtists() {
  usePageTitle('Artists');

  return (
    <>
      <h1>Artists</h1>
    </>
  );
}

export default PageArtists;
