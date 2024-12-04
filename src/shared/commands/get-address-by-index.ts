import { invoke } from '@tauri-apps/api/core';
import { toBech32m } from '@penumbra-zone/bech32m/format/convert';

export const getAddressByIndex = async (index: number): Promise<string | undefined> => {
  try {
    const address: Uint8Array = await invoke('get_address_by_index', { index });
    return toBech32m(address, 'penumbra');
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
