import { useEffect, useState } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { keyStore } from './key-store';

export const useConnection = (cb: (connected: boolean) => void) => {
  const {checkConnection} = useLocalObservable(() => keyStore);

  const [connected, setConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      const isConnected = await checkConnection();
      cb(isConnected);
      setConnected(isConnected);
      setLoading(false);
    };

    load();
  }, []);

  return {
    loading,
    connected,
  };
};
