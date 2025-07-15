import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import { Panel } from 'primereact/panel';

import type { RootState } from '@backend-src/stores/bxStore';

function BxPageHome() {
  usePageTitle('Home');

  const navigate = useNavigate();
  const { isAdmin } = useClerkUserRole();
  const { hasArtistCredentials, isCheckingArtistCredentials } = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    if (!hasArtistCredentials) {
      void navigate('/settings/profile');
    }
  }, [hasArtistCredentials, navigate]);

  if (isCheckingArtistCredentials) {
    return <SxProgressSpinner />;
  }

  return (
    <div className="bx-page bx-page--home">
      <h1>Home</h1>
      <SignedOut>
        <div className="bx-sign-in">
          <SignIn />
        </div>
      </SignedOut>
      <SignedIn>
        <BxArtistCredentialsChecker />
        <div className="flex flex-wrap -m-2">
          {isAdmin && (
            <div className="w-full lg:w-6">
              <Panel
                className="p-2"
                header="Artists"
              >
                <p>Manage all artists here.</p>
              </Panel>
            </div>
          )}
          <div className="w-full lg:w-6">
            <Panel
              className="p-2"
              header="Albums"
            >
              <p>Manage all albums here.</p>
            </Panel>
          </div>
          <div className="w-full lg:w-6">
            <Panel
              className="p-2"
              header="Songs"
            >
              <p>Manage all songs here.</p>
            </Panel>
          </div>
          <div className="w-full lg:w-6">
            <Panel
              className="p-2"
              header="Sessions"
            >
              <p>Manage all sessions here.</p>
            </Panel>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}

export default BxPageHome;
