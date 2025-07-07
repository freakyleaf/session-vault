import { useNavigate } from 'react-router';

import { Menubar } from 'primereact/menubar';

import type { MenuItem } from 'primereact/menuitem';

function BxPageNavigationContent() {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      command: () => {
        void navigate('/');
      },
      icon: 'pi pi-home',
      label: 'Home',
    },
    {
      command: () => {
        void navigate('/artists');
      },
      icon: 'pi pi-users',
      label: 'Artists',
    },
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

  return (
    <div className="bx-page-navigation-content">
      <Menubar model={items} />
    </div>
  );
}

export default BxPageNavigationContent;
