/* eslint-disable @typescript-eslint/no-explicit-any */

/*
 This class base on https://github.com/MetaMask/safe-event-emitter/blob/main/index.ts
*/
import { EventEmitter } from 'events';

type Handler = (...args: any[]) => void;
interface EventMap {
  [k: string]: Handler | Handler[] | undefined;
}

function safeApply<T, A extends any[]>(handler: (this: T, ...args: A) => void, context: T, args: A): void {
  try {
    Reflect.apply(handler, context, args);
  } catch (err) {
    setTimeout(() => {
      throw err;
    });
  }
}

function arrayClone<T>(arr: T[]): T[] {
  const n = arr.length;
  const copy = new Array(n);
  for (let i = 0; i < n; i += 1) {
    copy[i] = arr[i];
  }
  return copy;
}

export default class SafeEventEmitter extends EventEmitter {
  emit(type: string, ...args: any[]): boolean {
    let doError = type === 'error';
    const events: EventMap = (this as any)._events;
    if (events !== undefined) doError = doError && events.error === undefined;
    else if (!doError) return false;

    if (doError) {
      let er;
      if (args.length > 0) [er] = args;
      if (er instanceof Error) throw er;
      const err = new Error(`Unhandled error.${er ? ` (${er.message})` : ''}`);
      (err as any).context = er;
      throw err;
    }
    const handler = events[type];
    if (handler === undefined) return false;
    if (typeof handler === 'function') safeApply(handler, this, args);
    else {
      const len = handler.length;
      const listeners = arrayClone(handler);
      for (let i = 0; i < len; i += 1) {
        safeApply(listeners[i], this, args);
      }
    }
    return true;
  }
}
