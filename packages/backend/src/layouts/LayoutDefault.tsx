import { Outlet } from 'react-router';

import BxPageFooterContent from '@backend-src/components/BxPageFooterContent';
import BxPageHeaderContent from '@backend-src/components/BxPageHeaderContent';
import BxPageNavigationContent from '@backend-src/components/BxPageNavigationContent';

function LayoutDefault() {
  return (
    <div className="bx-layout bx-layout--default min-h-screen">
      <header className="bx-layout__header">
        <SxContainer>
          <BxPageHeaderContent />
        </SxContainer>
      </header>
      <nav className="bx-layout__navigation">
        <SxContainer>
          <BxPageNavigationContent />
        </SxContainer>
      </nav>
      <main className="bx-layout__main">
        <SxContainer>
          <Outlet />
        </SxContainer>
      </main>
      <footer className="bx-layout__footer">
        <SxContainer>
          <BxPageFooterContent />
        </SxContainer>
      </footer>
    </div>
  );
}

export default LayoutDefault;
