import { useState } from 'react';
import { Display } from '@penumbra-zone/ui/Display';
import { Grid } from '@penumbra-zone/ui/Grid';
import { Text } from '@penumbra-zone/ui/Text';

import './App.css';
import '@penumbra-zone/ui/style.css';

import { ImportPage, SyncPage } from '../pages/onboarding';
import { useConnection } from '../pages/onboarding/use-connection';

type Pages = 'import' | 'password' | 'sync' | undefined;

function App() {
  const [page, setPage] = useState<Pages>();
  useConnection((connected) => setPage(connected ? 'sync' : 'import'));

  return (
    <Grid>
      <Display>
        <main className='mt-4 text-text-primary'>
          {typeof page === 'undefined' && (
            <Text h3>Loading...</Text>
          )}

          {page === 'import' && <ImportPage next={() => setPage('sync')} />}
          {/*{page === 'password' && <PasswordPage next={() => setPage('sync')} />}*/}
          {page === 'sync' && <SyncPage />}
        </main>
      </Display>
    </Grid>
  );
}

export default App;
