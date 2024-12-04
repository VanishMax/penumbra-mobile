import { BrowserRouter, Route, Routes } from 'react-router';
import { Pages } from 'shared/types/pages';
import { OnboardingRouter } from 'pages/onboarding';
import { SyncRouter } from 'pages/sync';
import { AuthGuard } from 'entities/auth';
import { Layout } from './layout';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={Pages.auth} element={<AuthGuard />} />

          {OnboardingRouter}
          {SyncRouter}
        </Route>
      </Routes>
    </BrowserRouter>
  )
};
