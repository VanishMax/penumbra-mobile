import { useNavigate } from 'react-router';
import { Text } from '@penumbra-zone/ui/Text';
import { Card } from '@penumbra-zone/ui/Card';
import { useConnection } from 'entities/auth';
import { Pages } from 'shared/types/pages';
import { useEffect, useState } from 'react';
import { getBlockHeight } from 'shared/commands/get-block-height';
import { getAddressByIndex } from 'shared/commands/get-address-by-index';

export const SyncPage = () => {
  const navigate = useNavigate();
  useConnection((connected) => {
    if (!connected) {
      navigate(Pages.onboarding);
    }
  });

  const [data, setData] = useState<{ block?: number, address?: string}>();

  useEffect(() => {
    const fetchData = async () => {
      const block = await getBlockHeight();
      const address = await getAddressByIndex(0);
      setData({ block, address });
      console.log('Block height', block, address);
    };
    fetchData();
  });

  return (
    <Card>
      <div className='flex flex-col gap-2 text-text-primary overflow-hidden'>
        <Text h3 as='h1'>Syncing</Text>

        {data?.address && (
          <Text body whitespace='pre-line'>Your address is {data.address}</Text>
        )}

        {data?.block && (
          <Text body>Latest block height is {data.block}</Text>
        )}
      </div>
    </Card>
  );
};

export default SyncPage;
