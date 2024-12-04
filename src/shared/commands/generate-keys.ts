import { invoke } from '@tauri-apps/api/core';

export const generateKeys = async (seedPhrase: string): Promise<boolean> => {
  try {
    await invoke('generate_keys', { seedPhrase })
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
