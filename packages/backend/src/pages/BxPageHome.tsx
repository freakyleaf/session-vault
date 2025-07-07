import { usePageTitle } from '@backend-src/hooks/usePageTitle';

function BxPageHome() {
  usePageTitle('Home');

  return (
    <div className="bx-page bx-page--home">
      <h1>Home</h1>
    </div>
  );
}

export default BxPageHome;
