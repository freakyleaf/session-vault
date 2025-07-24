import { useArtist } from '@backend-src/hooks/bxUseArtist';
import { usePageTitle } from '@backend-src/hooks/bxUsePageTitle';

function BxPageProfile() {
  usePageTitle('Profile');

  const { artist, isLoadingProfile } = useArtist();

  if (isLoadingProfile) {
    return null;
  }

  return (
    <div className="bx-page bx-page--profile">
      <h1>Profile</h1>
      {!artist && <h2>Please Complete Your Profile</h2>}
      <BxAddEditArtistForm
        artist={artist ?? undefined}
        isModalForm={false}
      />
    </div>
  );
}

export default BxPageProfile;
