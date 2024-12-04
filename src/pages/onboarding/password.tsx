import { FormEvent } from 'react';
import { observer } from 'mobx-react-lite';

import { Card } from '@penumbra-zone/ui/Card';
import { Text } from '@penumbra-zone/ui/Text';
import { TextInput } from '@penumbra-zone/ui/TextInput';
import { Button } from '@penumbra-zone/ui/Button';

import { onboardingStore } from './state';

interface PasswordPageProps {
  next: VoidFunction;
}

export const PasswordPage = observer(({ next }: PasswordPageProps) => {
  const { password, setPassword } = onboardingStore;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    next();
  };

  return (
    <Card>
      <div className='flex flex-col text-text-primary'>
        <Text h3 as='h1'>Hello from Prax!</Text>
        <Text body color='text.secondary'>Please, enter the password</Text>

        <form className='mt-4 flex flex-col gap-4' onSubmit={onSubmit}>
          <label>
            <TextInput
              value={password}
              placeholder={'********'}
              onChange={setPassword}
            />
          </label>

          <Button
            type='submit'
            priority='primary'
            actionType='accent'
          >
            Submit
          </Button>
        </form>
      </div>
    </Card>
  )
});
