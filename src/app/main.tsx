import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './router';

import './global.css';
import '@penumbra-zone/ui/style.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Router />
  </StrictMode>,
);
