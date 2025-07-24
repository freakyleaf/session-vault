import { usePageTitle } from '@backend-src/hooks/bxUsePageTitle';

function BxPageAllSessions() {
  usePageTitle('Sessions');

  return (
    <div className="bx-page bx-page--all-sessions">
      <h1>Sessions</h1>
    </div>
  );
}

export default BxPageAllSessions;
