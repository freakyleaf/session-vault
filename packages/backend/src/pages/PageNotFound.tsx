import { usePageTitle } from '@backend-src/hooks/usePageTitle';

function PageNotFound() {
  usePageTitle('Not Found');

  return (
    <>
      <h1>Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </>
  );
}

export default PageNotFound;
