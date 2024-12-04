import { useState } from 'react';
import { Display } from '@penumbra-zone/ui/Display';
import { Grid } from '@penumbra-zone/ui/Grid';

import './App.css';
import '@penumbra-zone/ui/style.css';

import { ImportPage, SyncPage } from '../pages/onboarding';

type Pages = 'import' | 'password' | 'sync';

function App() {
  const [page, setPage] = useState<Pages>('import');

  return (
    <Grid>
      <Display>
        <main className='mt-4'>
          {page === 'import' && <ImportPage next={() => setPage('sync')} />}
          {/*{page === 'password' && <PasswordPage next={() => setPage('sync')} />}*/}
          {page === 'sync' && <SyncPage />}
        </main>
      </Display>
    </Grid>
  );
}

export default App;
