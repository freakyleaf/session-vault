import { ENVIRONMENT_DEVELOPMENT } from '@shared-root/src/lib/constants';

import type { TEnvironment } from '@shared-root/src/lib/types';

export function getCurrentEnvironment() {
  const currentEnvironment: TEnvironment =
    (import.meta.env.VITE_ENVIRONMENT as TEnvironment) ||
    ENVIRONMENT_DEVELOPMENT;

  return {
    currentEnvironment,
  };
}
