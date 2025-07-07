import { ClerkProvider } from '@clerk/clerk-react';
import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import { StrictMode } from 'react';

import AppBackend from '@backend-src/components/AppBackend.tsx';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

import '@backend-styles/index.scss';
import '@shared-styles/index.scss';

const PUBLISHABLE_KEY =
  typeof import.meta.env.VITE_CLERK_PUBLISHABLE_KEY === 'string'
    ? import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
    : undefined;

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Missing Clerk Publishable Key. Please ensure you've provided a `VITE_CLERK_PUBLISHABLE_KEY` environment variable.",
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/"
      >
        <AppBackend />
      </ClerkProvider>
    </PrimeReactProvider>
  </StrictMode>,
);
