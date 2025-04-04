import { makeAutoObservable } from 'mobx';

class Timer {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increaseTimer() {
    this.secondsPassed += 1;
  }
}

export const timerStore = new Timer();

export interface MobxTimerStoreType {
  timer: Timer;
}

setInterval(() => {
  timerStore.increaseTimer();
}, 1000);
