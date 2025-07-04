import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import { StrictMode } from 'react';

import FrontendApp from '@frontend-components/FrontendApp.tsx';

import 'primereact/resources/themes/lara-light-cyan/theme.css';
import '@frontend-styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <FrontendApp />
    </PrimeReactProvider>
  </StrictMode>,
);
