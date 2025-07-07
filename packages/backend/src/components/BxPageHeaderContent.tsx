import { Link } from 'react-router';

import { WEBSITE_NAME } from '@shared-src/lib/constants';

function BxPageHeaderContent() {
  return (
    <div className="bx-page-header-content">
      <Link
        className="inline-block"
        to="/"
      >
        <img
          src="/studio-log-logo.svg"
          alt={`${WEBSITE_NAME} logo`}
          className="w-12rem py-3"
        />
      </Link>
    </div>
  );
}

export default BxPageHeaderContent;
