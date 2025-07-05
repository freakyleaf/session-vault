import { Outlet } from 'react-router';

import PageFooterContent from '@backend-src/components/PageFooterContent';
import PageHeaderContent from '@backend-src/components/PageHeaderContent';
import PageNavigationContent from '@backend-src/components/PageNavigationContent';

function LayoutDefault() {
  return (
    <div className="layout layout--default min-h-screen flex flex-column">
      <header className="layout__header">
        <div className="container">
          <PageHeaderContent />
        </div>
      </header>
      <nav className="layout__navigation">
        <div className="container">
          <PageNavigationContent />
        </div>
      </nav>
      <main className="layout__main flex-grow-1">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <footer className="layout__footer">
        <div className="container">
          <PageFooterContent />
        </div>
      </footer>
    </div>
  );
}

export default LayoutDefault;
