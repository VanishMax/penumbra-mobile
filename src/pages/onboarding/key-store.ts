import { FullViewingKey, SpendKey } from '@penumbra-zone/protobuf/penumbra/core/keys/v1/keys_pb';
import { makeAutoObservable } from 'mobx';
import { invoke } from '@tauri-apps/api/core';

class KeyStore {
  spendKey?: SpendKey = undefined;
  fullViewingKey?: FullViewingKey = undefined;

  constructor () {
    makeAutoObservable(this);
  }

  checkConnection = async (): Promise<boolean> => {
    return await invoke('is_connected');
  };

  createKeys = async (seedPhrase: string) => {
    const res: [number[], number[]] = await invoke('generate_keys', { seedPhrase });

    this.spendKey = SpendKey.fromBinary(new Uint8Array(res[0]));
    this.fullViewingKey = FullViewingKey.fromBinary(new Uint8Array(res[1]));

    const block = await invoke('get_block_height');
    console.log('BLOOOOOOO', block);
  };
}

export const keyStore = new KeyStore();
