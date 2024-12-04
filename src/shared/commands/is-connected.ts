import { invoke } from '@tauri-apps/api/core';

export const isConnected = async (): Promise<boolean> => {
  try {
    return invoke('is_connected');
  } catch (error) {
    console.error(error);
    return false;
  }
};
