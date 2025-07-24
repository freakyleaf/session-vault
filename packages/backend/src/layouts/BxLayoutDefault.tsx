import { Outlet } from 'react-router';

import { useLoadingStore } from '@backend-src/stores/bxLoadingStore';

function BxLayoutDefault() {
  const { isGlobalLoading } = useLoadingStore();

  return (
    <div className="bx-layout bx-layout--default min-h-screen">
      <header className="bx-layout__header">
        <BxPageHeader />
      </header>
      <nav className="bx-layout__navigation">
        <BxPageNavigation />
      </nav>
      <main className="bx-layout__main">
        <BxGlobalLoading
          className={
            isGlobalLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }
        />
        <SxContainer
          className={
            isGlobalLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }
        >
          <Outlet />
        </SxContainer>
      </main>
      <footer className="bx-layout__footer">
        <BxPageFooter />
      </footer>
    </div>
  );
}

export default BxLayoutDefault;
