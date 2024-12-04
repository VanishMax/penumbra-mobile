import { Route } from 'react-router';
import { lazy } from 'react';
import { Pages } from 'shared/types/pages';

const SyncPage = lazy(() => import('./page'));

export const SyncRouter = (
  <Route path={Pages.sync}>
    <Route index element={<SyncPage />} />
  </Route>
);
