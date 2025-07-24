import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';

import { Panel } from 'primereact/panel';

import { useArtist } from '@backend-src/hooks/bxUseArtist';
import { useClerkUserRole } from '@backend-src/hooks/bxUseClerkUserRole';
import { usePageTitle } from '@backend-src/hooks/bxUsePageTitle';

function BxPageHome() {
  usePageTitle('Home');
  const { artist } = useArtist();
  const { isAdmin } = useClerkUserRole();

  const artistIsActive = artist?.isActive ?? false;

  return (
    <div className="bx-page bx-page--home">
      <h1>Home</h1>
      <SignedOut>
        <div className="bx-sign-in">
          <SignIn />
        </div>
      </SignedOut>
      <SignedIn>
        {!isAdmin && !artistIsActive ? (
          <>Your account is not currently active.</>
        ) : (
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
        )}
      </SignedIn>
    </div>
  );
}

export default BxPageHome;
