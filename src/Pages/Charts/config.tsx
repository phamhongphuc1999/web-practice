/* eslint-disable @typescript-eslint/no-explicit-any */
const BasicLineChart = {
  '1665723600': {
    line1: 392578.09358305106,
    line2: 664320.1725052515,
    line3: 271742.0789222004,
  },
  '1665727200': {
    line1: 664249.1102417782,
    line2: 392508.2473097546,
    line3: 271740.8629320236,
  },
  '1665730800': {
    line1: 392409.75402675517,
    line2: 664161.0232711032,
    line3: 271751.269244348,
  },
  '1665734400': {
    line1: 379949.03371049697,
    line2: 661478.847881647,
    line3: 281529.81417115,
  },
  '1665738000': {
    line1: 379813.2925196429,
    line2: 661343.6703384351,
    line3: 281530.3778187922,
  },
  '1665741600': {
    line1: 380842.27728594636,
    line2: 281733.0190098349,
    line3: 662575.2962957813,
  },
  '1665745200': {
    line1: 381025.4051068056,
    line2: 281801.2974043151,
    line3: 662826.7025111207,
  },
  '1665748800': {
    line1: 374644.5942990881,
    line2: 287419.0103235439,
    line3: 662063.604622632,
  },
  '1665752400': {
    line1: 406779.4703865776,
    line2: 287875.7843228295,
    line3: 664655.2547094071,
  },
  '1665756000': {
    line1: 442067.1701914974,
    line2: 290949.4403110612,
    line3: 663016.6105025586,
  },
  '1665759600': {
    line1: 550393.5108284614,
    line2: 369875.4613200467,
    line3: 290518.0495084147,
  },
  '1665763200': {
    line1: 658858.879900372,
    line2: 368622.9916536951,
    line3: 290235.8882466769,
  },
  '1665766800': {
    line1: 657786.734348186,
    line2: 358550.7981676061,
    line3: 289235.9361805798,
  },
  '1665770400': {
    line1: 658516.0473651761,
    line2: 340147.98083756864,
    line3: 289368.0665276075,
  },
  '1665774000': {
    line1: 261950.6300172691,
    line2: 656685.7711112412,
    line3: 294735.1410939721,
  },
  '1665777600': {
    line1: 361744.5025098095,
    line2: 556479.1325689751,
    line3: 294734.6300591656,
  },
  '1665781200': {
    line1: 362063.9269490099,
    line2: 456900.4494248369,
    line3: 294836.522475827,
  },
  '1665784800': {
    line1: 360887.9940480648,
    line2: 400430.9244378323,
    line3: 294542.9303897675,
  },
  '1665788400': {
    line1: 361278.09628442087,
    line2: 500000.5502712862,
    line3: 294587.4539868653,
  },
  '1665792000': {
    line1: 361613.64430357283,
    line2: 556296.2677179143,
    line3: 294682.6234143415,
  },
  '1665795600': {
    line1: 361554.8258352883,
    line2: 600000.6589775943,
    line3: 294672.833142306,
  },
  '1665799200': {
    line1: 361672.13743839297,
    line2: 656398.6882586256,
    line3: 294726.5508202326,
  },
  '1665802800': {
    line1: 361678.53023735964,
    line2: 656406.1145517277,
    line3: 294727.584314368,
  },
  '1665806400': {
    line1: 362000.1686668421,
    line2: 656805.8541407072,
    line3: 294805.6854738651,
  },
};

export function getBasicLineChart(numberOfLine = 3) {
  const line1 = [];
  const line2 = [];
  const line3 = [];
  for (const item of Object.entries(BasicLineChart)) {
    const timestamp = Number(item[0]) * 1000;
    const data = item[1];
    line1.push({ x: timestamp, y: data.line1 });
    line2.push({ x: timestamp, y: data.line2 });
    line3.push({ x: timestamp, y: data.line3 });
  }
  const result = [{ name: 'Line1', data: line1 }];
  if (numberOfLine >= 2) result.push({ name: 'Line2', data: line2 });
  if (numberOfLine >= 3) result.push({ name: 'Line3', data: line3 });
  return result;
}

export function getThresholdLineChart(config?: any) {
  const line1 = [];
  for (const item of Object.entries(BasicLineChart)) {
    const timestamp = Number(item[0]) * 1000;
    const data = item[1];
    line1.push({ x: timestamp, y: data.line1 });
  }
  return config ? [{ name: 'Line1', data: line1, ...config }] : [{ name: 'Line1', data: line1 }];
}

export const BarChartCategories = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export const BarChartData = [
  {
    name: 'Tokyo',
    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
  },
  {
    name: 'New York',
    data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3],
  },
  {
    name: 'London',
    data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2],
  },
  {
    name: 'Berlin',
    data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1],
  },
];
