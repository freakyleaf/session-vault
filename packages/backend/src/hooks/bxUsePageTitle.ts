import { useEffect } from 'react';

import { WEBSITE_NAME } from '@shared-src/lib/constants';

export function usePageTitle(title: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} - ${WEBSITE_NAME}`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
