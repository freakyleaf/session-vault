import { Link } from 'react-router';

import { usePageTitle } from '@backend-src/hooks/bxUsePageTitle';

function BxPageSettings() {
  usePageTitle('Settings');

  return (
    <div className="bx-page bx-page--settings">
      <h1>Settings</h1>
      <p>On this page you can:</p>
      <ul>
        <li>
          <Link to="/settings/profile">Manage your profile</Link>
        </li>
      </ul>
    </div>
  );
}

export default BxPageSettings;
