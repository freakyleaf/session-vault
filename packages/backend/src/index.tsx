import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import { StrictMode } from 'react';

import BackendApp from '@backend-components/BackendApp.tsx';

import 'primereact/resources/themes/lara-light-cyan/theme.css';
import '@backend-styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <BackendApp />
    </PrimeReactProvider>
  </StrictMode>,
);
