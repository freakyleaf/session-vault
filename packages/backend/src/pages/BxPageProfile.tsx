import { usePageTitle } from '@backend-src/hooks/bxUsePageTitle';

function BxPageProfile() {
  usePageTitle('Profile');
  return (
    <div className="bx-page bx-page--profile">
      <h1>Profile</h1>
      <BxAddEditArtistForm />
    </div>
  );
}

export default BxPageProfile;
