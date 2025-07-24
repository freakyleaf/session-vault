import { useAuth, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router';

import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';

import { useArtist } from '@backend-src/hooks/bxUseArtist';
import { useClerkUserRole } from '@backend-src/hooks/bxUseClerkUserRole';

import type { MenuItem } from 'primereact/menuitem';

function BxPageNavigation() {
  const navigate = useNavigate();

  const { artist } = useArtist();
  const { isAdmin, isArtist } = useClerkUserRole();
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();

  const artistIsActive = artist?.isActive ?? false;

  const menuItemsAuthenticatedAdmin: MenuItem[] = [
    {
      command: () => {
        void navigate('/artists');
      },
      icon: 'pi pi-users',
      label: 'Artists',
    },
  ];

  const menuItemsAuthenticatedGlobal: MenuItem[] = [
    {
      command: () => {
        void navigate('/albums');
      },
      icon: 'pi pi-box',
      label: 'Albums',
    },
    {
      command: () => {
        void navigate('/songs');
      },
      icon: 'pi pi-book',
      label: 'Songs',
    },
    {
      command: () => {
        void navigate('/sessions');
      },
      icon: 'pi pi-list',
      label: 'Sessions',
    },
  ];

  const menuItemsAuthenticatedSettings: MenuItem[] = [
    {
      command: () => {
        void navigate('/settings');
      },
      icon: 'pi pi-cog',
      label: 'Settings',
    },
    {
      command: () => {
        void navigate('/settings/profile');
      },
      icon: 'pi pi-user',
      label: 'Profile',
    },
  ];

  const menuItemsUnauthenticatedGlobal: MenuItem[] = [
    {
      command: () => {
        void navigate('/');
      },
      icon: 'pi pi-home',
      label: 'Home',
    },
  ];

  let items: MenuItem[] = menuItemsUnauthenticatedGlobal;

  if (isSignedIn) {
    if (isAdmin) {
      items = [
        ...items,
        ...menuItemsAuthenticatedAdmin,
        ...menuItemsAuthenticatedGlobal,
      ];
    } else if (isArtist && artistIsActive) {
      items = [
        ...items,
        ...menuItemsAuthenticatedGlobal,
        ...menuItemsAuthenticatedSettings,
      ];
    }
  }

  const end = isSignedIn && (
    <Button
      label="Sign Out"
      severity="secondary"
      onClick={() => void signOut()}
      outlined
    />
  );

  return (
    <div className="bx-page-navigation">
      <SxContainer>
        <div className="bx-page-navigation__content">
          <Menubar
            end={end}
            model={items}
          />
        </div>
      </SxContainer>
    </div>
  );
}

export default BxPageNavigation;
