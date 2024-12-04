import { FormEvent } from 'react';
import { observer } from 'mobx-react-lite';

import { Card } from '@penumbra-zone/ui/Card';
import { Text } from '@penumbra-zone/ui/Text';
import { TextInput } from '@penumbra-zone/ui/TextInput';
import { Toggle } from '@penumbra-zone/ui/Toggle';
import { Button } from '@penumbra-zone/ui/Button';

import { onboardingStore } from './state';
import { keyStore } from './key-store';

interface ImportPageProps {
  next: VoidFunction;
}

export const ImportPage = observer(({ next }: ImportPageProps) => {
  const { phrase, setLength, update, isLong } = onboardingStore;
  const { createKeys } = keyStore;

  const isInvalid = phrase.some((word) => word.trim().length === 0);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createKeys(phrase.join(' '));
    next();
  };

  return (
    <Card>
      <div className='flex flex-col text-text-primary'>
        <Text h3 as='h1'>Hello from Prax!</Text>
        <Text body color='text.secondary'>Import wallet with recovery phrase</Text>

        <form className='mt-4 flex flex-col gap-4' onSubmit={onSubmit}>
          <div className='h-6'>
            <label className='flex gap-2 items-center cursor-pointer'>
              <Text body>12 words</Text>
              <Toggle label='Longer' value={isLong} onChange={setLength} />
              <Text body>24 words</Text>
            </label>
          </div>

          <div className='grid gap-2 grid-cols-1 desktop:grid-cols-2 lg:grid-cols-3'>
            {phrase.map((value, i) => (
              <label key={i}>
                <TextInput
                  value={value}
                  placeholder={`Word ${i + 1}`}
                  onChange={(newValue) => update(newValue, i)}
                />
              </label>
            ))}
          </div>

          <Button
            type='submit'
            priority='primary'
            actionType='accent'
            disabled={isInvalid}
          >
            Submit
          </Button>
        </form>
      </div>
    </Card>
  )
});
