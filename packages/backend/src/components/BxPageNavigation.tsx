import { useAuth, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router';

import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';

import { useClerkUserRole } from '@backend-src/hooks/bxUseClerkUserRole';

import type { MenuItem } from 'primereact/menuitem';

function BxPageNavigation() {
  const navigate = useNavigate();

  const { isAdmin } = useClerkUserRole();
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();

  const globalMenuItems: MenuItem[] = [
    {
      command: () => {
        void navigate('/');
      },
      icon: 'pi pi-home',
      label: 'Home',
    },
  ];

  const authenticatedAdminMenuItems: MenuItem[] = [
    {
      command: () => {
        void navigate('/artists');
      },
      icon: 'pi pi-users',
      label: 'Artists',
    },
  ];

  const authenticatedGlobalMenuItems: MenuItem[] = [
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

  let items: MenuItem[] = globalMenuItems;

  if (isSignedIn) {
    if (isAdmin) {
      items = [
        ...items,
        ...authenticatedAdminMenuItems,
        ...authenticatedGlobalMenuItems,
      ];
    } else {
      items = [...items, ...authenticatedGlobalMenuItems];
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
