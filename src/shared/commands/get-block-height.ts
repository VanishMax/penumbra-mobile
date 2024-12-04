import { invoke } from '@tauri-apps/api/core';

export const getBlockHeight = async (): Promise<number | undefined> => {
  try {
    return invoke('get_block_height');
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
