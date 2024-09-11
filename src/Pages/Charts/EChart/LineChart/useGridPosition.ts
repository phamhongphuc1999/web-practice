import { useMemo } from 'react';
import { DashboardCoreDataType } from 'src/global';
import { DashboardLineConfig } from './line-chart-config';

const DEFAULT_GAP = 50;

export default function useGridPosition(show: Partial<DashboardCoreDataType>) {
  const { left, right, offsets } = useMemo(() => {
    const leftConfig = Object.values(DashboardLineConfig)
      .filter((item) => show[item.id] && item.position == 'left')
      .map((item) => item.id);
    const rightConfig = Object.values(DashboardLineConfig)
      .filter((item) => show[item.id] && item.position == 'right')
      .map((item) => item.id);
    let left = 0;
    let right = 0;
    const offsets: Partial<DashboardCoreDataType> = {};
    leftConfig.forEach((item, index) => {
      left += DEFAULT_GAP;
      if (index == 0) offsets[item] = 0;
      if (index == 1) offsets[item] = DEFAULT_GAP;
      else if (index > 1) {
        const _preKey = leftConfig[index - 1];
        offsets[item] = (offsets[_preKey] ?? 0) + DEFAULT_GAP;
      }
    });
    rightConfig.forEach((item, index) => {
      right += DEFAULT_GAP;
      if (index == 0) offsets[item] = 0;
      if (index == 1) offsets[item] = DEFAULT_GAP;
      else if (index > 1) {
        const _preKey = rightConfig[index - 1];
        offsets[item] = (offsets[_preKey] ?? 0) + DEFAULT_GAP;
      }
    });

    return { left, right, offsets };
  }, [show]);

  return { left, right, offsets };
}
