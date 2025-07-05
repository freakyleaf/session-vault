import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import { StrictMode } from 'react';

import AppFrontend from '@frontend-src/components/AppFrontend';

import 'primeflex/primeflex.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

import '@frontend-styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <AppFrontend />
    </PrimeReactProvider>
  </StrictMode>,
);
