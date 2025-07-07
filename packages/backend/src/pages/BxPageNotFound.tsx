import { usePageTitle } from '@backend-src/hooks/usePageTitle';

function BxPageNotFound() {
  usePageTitle('Not Found');

  return (
    <div className="bx-page bx-page--not-found">
      <h1>Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default BxPageNotFound;
