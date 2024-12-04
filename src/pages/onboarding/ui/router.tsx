import { Route } from 'react-router';
import { lazy } from 'react';
import { Pages } from 'shared/types/pages';

const ImportPage = lazy(() => import('./import'));

export const OnboardingRouter = (
  <Route path={Pages.onboarding}>
    <Route index element={<ImportPage />} />
  </Route>
);
