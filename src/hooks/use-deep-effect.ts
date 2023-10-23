/* eslint-disable @typescript-eslint/no-explicit-any */
import isEqual from 'lodash.isequal';
import { DependencyList, useEffect, useRef } from 'react';

interface ItemType {
  [key: string]: { before: any; after: any; mode: 'change' | 'remain' };
}

export default function useDeepEffect(
  effectHook: (changedDeps: ItemType) => void,
  deps: DependencyList,
  metadata?: Partial<{ depsName: Array<string>; mode: 'normal' | 'timeout'; interval: number }>
) {
  const ref = useRef(deps);

  useEffect(() => {
    const mode = metadata?.mode ?? 'normal';
    const interval = metadata?.interval ?? 1000;
    const depsName = metadata?.depsName ?? [];
    if (mode == 'normal') {
      const temp: ItemType = {};
      let counter = 0;
      for (const item of deps) {
        const keyName = depsName[counter] || counter;
        temp[keyName] = {
          before: ref.current?.[counter],
          after: item,
          mode: isEqual(item, ref.current?.[counter]) ? 'remain' : 'change',
        };
        counter++;
      }
      effectHook(temp);
      ref.current = deps;
    } else {
      const fn = setTimeout(() => {
        const temp: ItemType = {};
        let counter = 0;
        for (const item of deps) {
          const keyName = depsName[counter] || counter;
          temp[keyName] = {
            before: ref.current?.[counter],
            after: item,
            mode: isEqual(item, ref.current?.[counter]) ? 'remain' : 'change',
          };
          counter++;
        }
        effectHook(temp);
        ref.current = deps;
      }, interval);
      return () => clearTimeout(fn);
    }
  }, [deps, metadata?.depsName, metadata?.mode, metadata?.interval, effectHook]);
}
