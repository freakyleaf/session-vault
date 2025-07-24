import { useAuth, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router';

import { Tag } from 'primereact/tag';

import { useClerkUserRole } from '@backend-src/hooks/bxUseClerkUserRole';

import { WEBSITE_NAME } from '@shared-src/lib/constants';

function BxPageHeaderContent() {
  const { isAdmin, isArtist } = useClerkUserRole();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const primaryEmailAddress = useMemo(
    () => user?.primaryEmailAddress?.emailAddress || null,
    [user?.primaryEmailAddress?.emailAddress],
  );

  const showUserSection = primaryEmailAddress && isSignedIn;

  return (
    <div className="bx-page-header">
      {showUserSection && (
        <div className="bx-page-header__user">
          <SxContainer>
            <div className="bx-page-header__content">
              {primaryEmailAddress}
              {isAdmin && (
                <Tag
                  severity="success"
                  value="Admin"
                />
              )}
              {isArtist && (
                <Tag
                  severity="success"
                  value="Artist"
                />
              )}
            </div>
          </SxContainer>
        </div>
      )}
      <div className="bx-page-header__logo">
        <SxContainer>
          <div className="bx-page-header__content">
            <Link
              className="inline-block"
              to="/"
            >
              <img
                alt={`${WEBSITE_NAME} logo`}
                className="w-12rem py-3"
                src="/site-logo.svg"
              />
            </Link>
          </div>
        </SxContainer>
      </div>
    </div>
  );
}

export default BxPageHeaderContent;
