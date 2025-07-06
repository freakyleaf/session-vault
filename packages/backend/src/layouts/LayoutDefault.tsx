import { Outlet } from 'react-router';

import PageFooterContent from '@backend-src/components/PageFooterContent';
import PageHeaderContent from '@backend-src/components/PageHeaderContent';
import PageNavigationContent from '@backend-src/components/PageNavigationContent';

function LayoutDefault() {
  return (
    <div className="layout layout--default min-h-screen flex flex-column">
      <header className="layout__header">
        <SxContainer>
          <PageHeaderContent />
        </SxContainer>
      </header>
      <nav className="layout__navigation">
        <SxContainer>
          <PageNavigationContent />
        </SxContainer>
      </nav>
      <main className="layout__main flex-grow-1">
        <SxContainer>
          <Outlet />
        </SxContainer>
      </main>
      <footer className="layout__footer">
        <SxContainer>
          <PageFooterContent />
        </SxContainer>
      </footer>
    </div>
  );
}

export default LayoutDefault;
