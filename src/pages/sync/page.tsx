import { useNavigate } from 'react-router';
import { Text } from '@penumbra-zone/ui/Text';
import { Card } from '@penumbra-zone/ui/Card';
import { useConnection } from 'entities/auth';
import { Pages } from 'shared/types/pages';

export const SyncPage = () => {
  const navigate = useNavigate();
  useConnection((connected) => {
    if (!connected) {
      navigate(Pages.onboarding);
    }
  });

  return (
    <Card>
      <div className='flex flex-col text-text-primary'>
        <Text h3 as='h1'>Syncing</Text>
      </div>
    </Card>
  );
};

export default SyncPage;
