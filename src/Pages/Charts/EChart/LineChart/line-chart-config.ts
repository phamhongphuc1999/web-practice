import { DashboardLineConfigType } from 'src/global';

export const DashboardLineConfig: DashboardLineConfigType = {
  stakers: {
    id: 'stakers',
    title: 'Stakers',
    colorIndex: 0,
    position: 'left',
    type: 'line',
  },
  newStakers: {
    id: 'newStakers',
    title: 'New stakers',
    colorIndex: 1,
    position: 'left',
    type: 'bar',
  },
  aptStaked: {
    id: 'aptStaked',
    title: 'Apt staked',
    colorIndex: 2,
    position: 'right',
    type: 'line',
  },
  averageStakedAmt: {
    id: 'averageStakedAmt',
    title: 'Average staked amt',
    colorIndex: 4,
    position: 'right',
    type: 'bar',
  },
  medianStakedAmt: {
    id: 'medianStakedAmt',
    title: 'Median staked amt',
    colorIndex: 3,
    position: 'right',
    type: 'bar',
  },
  top1Percent: {
    id: 'top1Percent',
    title: 'Top 1%',
    colorIndex: 5,
    position: 'right',
    type: 'bar',
  },
  top10Percent: {
    id: 'top10Percent',
    title: 'Top 10%',
    colorIndex: 5,
    position: 'right',
    type: 'bar',
  },
};
