import { useConnection } from 'entities/auth/use-connection';
import { Navigate } from 'react-router';
import { Pages } from 'shared/types/pages';

export const AuthGuard = () => {
  const { loading, connected } = useConnection();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (connected) {
    return <Navigate to={Pages.sync} />
  }

  return <Navigate to={Pages.onboarding} />
};
