/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
const observables = new Map(); // Stores tracked values
const dependencies = new Map(); // Maps state properties to dependent functions

function observable(obj: any) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      if (!dependencies.has(prop)) dependencies.set(prop, new Set());
      observables.set(prop, target[prop]);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      Reflect.set(target, prop, value, receiver);
      if (dependencies.has(prop)) {
        dependencies.get(prop).forEach((fn: any) => fn()); // Trigger reactions
      }
      return true;
    },
  });
}

const state = observable({ count: 0 });

function reaction(fn: any) {
  dependencies.get('count').add(fn);
}

reaction(() => {
  console.log(`Count changed to: ${state.count}`);
});

state.count = 1; // Logs: "Count changed to: 1"
state.count = 2; // Logs: "Count changed to: 2"
