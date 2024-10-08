import { useMemo } from 'react';
import { DashboardGlobalDataType } from 'src/global';
import { random } from 'src/services';

function createXAxis(numberOfPoint: number) {
  const currentTimestamp = Date.now();
  const result: Array<number> = [currentTimestamp];
  for (let i = 0; i < numberOfPoint - 1; i++) {
    result.push(result[i] - 604800000);
  }
  return { axis: result.reverse() };
}

function createYAxis(numberOfPoint: number, beginPoint: number, range: number) {
  const result: Array<number> = [beginPoint];
  for (let i = 0; i < numberOfPoint - 1; i++) {
    let lower = result[i] - range;
    const upper = result[i] + range;
    if (lower < 0) lower = 0;
    result.push(Math.ceil(random(lower, upper)));
  }
  return result;
}

function createIncrementYAxis(numberOfPoint: number, beginPoint: number, range: number) {
  const result: Array<number> = [beginPoint];
  for (let i = 0; i < numberOfPoint - 1; i++) {
    const _increment = random(1, range);
    result.push(result[i] + Math.ceil(_increment));
  }
  return result;
}

export default function useOverviewData(numberOfPoint: number) {
  return useMemo<DashboardGlobalDataType>(() => {
    const { axis: xAxis } = createXAxis(numberOfPoint);
    const _stakers = createIncrementYAxis(numberOfPoint, 250, 50);
    const _newStakers = createIncrementYAxis(numberOfPoint, 10, 30);
    const _aptStaked = createYAxis(numberOfPoint, 100, 300);
    const _averageStakedAmt = createYAxis(numberOfPoint, 200, 100);
    const _medianStakedAmt = createYAxis(numberOfPoint, 440, 432);
    const _top1Percent = createYAxis(numberOfPoint, 2000, 500);
    const _top10Percent = createYAxis(numberOfPoint, 200, 15);

    const stakers: Array<[number, number]> = [];
    const newStakers: Array<[number, number]> = [];
    const aptStaked: Array<[number, number]> = [];
    const averageStakedAmt: Array<[number, number]> = [];
    const medianStakedAmt: Array<[number, number]> = [];
    const top1Percent: Array<[number, number]> = [];
    const top10Percent: Array<[number, number]> = [];
    let counter = 0;
    for (const x of xAxis) {
      stakers.push([x, _stakers[counter]]);
      newStakers.push([x, _newStakers[counter]]);
      aptStaked.push([x, _aptStaked[counter]]);
      averageStakedAmt.push([x, _averageStakedAmt[counter]]);
      medianStakedAmt.push([x, _medianStakedAmt[counter]]);
      top1Percent.push([x, _top1Percent[counter]]);
      top10Percent.push([x, _top10Percent[counter]]);
      counter++;
    }
    return {
      stakers,
      newStakers,
      aptStaked,
      averageStakedAmt,
      medianStakedAmt,
      top1Percent,
      top10Percent,
    };
  }, [numberOfPoint]);
}
