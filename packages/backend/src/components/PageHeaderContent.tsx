import { Link } from 'react-router';

import { WEBSITE_NAME } from '@shared/lib/constants';

function PageHeaderContent() {
  return (
    <Link to="/">
      <img
        src="/studio-log-logo.svg"
        alt={`${WEBSITE_NAME} logo`}
        className="w-12rem py-3"
      />
    </Link>
  );
}

export default PageHeaderContent;
