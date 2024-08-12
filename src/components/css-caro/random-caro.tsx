import { useMemo } from 'react';
import NormalCssCaro, { CssCaroProps } from './normal-css-caro';
import { randomSubGroup } from 'src/services';

interface Props extends Omit<CssCaroProps, 'blocks'> {
  selectedBlock?: number;
}

export default function RandomCaro(props: Props) {
  const { rows, columns, selectedBlock = 1 } = props;

  const blocks = useMemo<Array<[number, number]>>(() => {
    const range = rows * columns;
    const rawBlocks = randomSubGroup(range, selectedBlock);
    const result: Array<[number, number]> = [];
    for (const rawBlock of rawBlocks) {
      const _row = Math.floor(rawBlock / columns);
      const _column = rawBlock % columns;
      result.push([_row, _column]);
    }
    return result;
  }, [rows, columns, selectedBlock]);

  return <NormalCssCaro {...props} blocks={blocks} />;
}
