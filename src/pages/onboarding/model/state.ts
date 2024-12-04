import { makeAutoObservable } from 'mobx';

class ImportStore {
  phrase: string[] = []
  isLong: boolean = false;
  password: string = '';

  constructor() {
    makeAutoObservable(this);

    this.setLength(false);
  }

  setLength = (isLong: boolean) => {
    this.isLong = isLong;

    const desiredLength = isLong ? 24 : 12;
    const currLength = this.phrase.length;

    if (currLength === desiredLength) {
      return;
    }

    if (currLength < desiredLength) {
      this.phrase = this.phrase.concat(
        new Array(desiredLength - currLength).fill(''),
      );
    } else {
      this.phrase = this.phrase.slice(0, desiredLength);
    }
  }

  update = (text: string, position: number) => {
    const words = text.trim().split(' ');

    // Extend phrase length if trying to paste in one that's longer
    if (words.length > this.phrase.length) {
      this.setLength(true);
    }

    // If attempting to add entire seed phrase, spread through the subsequent fields
    words.slice(0, this.phrase.length - position).forEach((word, i) => {
        this.phrase[position + i] = word;
    });
  }

  setPassword = (value: string) => {
    this.password = value;
  };
}

export const onboardingStore = new ImportStore();
