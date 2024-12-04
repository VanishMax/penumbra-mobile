import { Display } from '@penumbra-zone/ui/Display';
import { Grid } from '@penumbra-zone/ui/Grid';
import { Outlet } from 'react-router';

export const Layout = () => {
  return (
    <Grid>
      <Display>
        <main className='mt-4 text-text-primary'>
          <Outlet />
        </main>
      </Display>
    </Grid>
  );
};
