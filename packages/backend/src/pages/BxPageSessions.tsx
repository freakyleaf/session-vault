import { usePageTitle } from '@backend-src/hooks/usePageTitle';

function BxPageSessions() {
  usePageTitle('Sessions');

  return (
    <div className="bx-page bx-page--sessions">
      <h1>Sessions</h1>
    </div>
  );
}

export default BxPageSessions;
