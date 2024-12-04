import { useEffect, useState } from 'react';
import { isConnected } from 'shared/commands/is-connected';

export const useConnection = (cb?: (connected: boolean) => void) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      const connected = await isConnected();
      cb?.(connected);
      setConnected(connected);
      setLoading(false);
    };

    load();
  }, []);

  return {
    loading,
    connected,
  };
};
