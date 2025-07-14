import { Outlet } from 'react-router';

function BxLayoutDefault() {
  return (
    <div className="bx-layout bx-layout--default min-h-screen">
      <header className="bx-layout__header">
        <BxPageHeader />
      </header>
      <nav className="bx-layout__navigation">
        <BxPageNavigation />
      </nav>
      <main className="bx-layout__main">
        <SxContainer>
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
