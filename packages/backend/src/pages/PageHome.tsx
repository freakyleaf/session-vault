import { usePageTitle } from '@backend-src/hooks/usePageTitle';

function PageHome() {
  usePageTitle('Home');

  return (
    <>
      <h1>Home</h1>
    </>
  );
}

export default PageHome;
