import { useMemo } from 'react';

export interface CssCaroProps {
  rows: number;
  columns: number;
  blocks?: Array<{ row: number; column: number; className?: string }>;
  blockClassName?: string;
  stickClassName?: string;
  className?: string;
}

export default function NormalCssCaro(props: CssCaroProps) {
  const { rows, columns, blocks = [], blockClassName, stickClassName, className } = props;

  const rowStep = useMemo(() => {
    return 100 / rows;
  }, [rows]);

  const columnStep = useMemo(() => {
    return 100 / columns;
  }, [columns]);

  return (
    <div className={`relative border-gray-50 border-[0.5px] overflow-hidden ${className}`}>
      {blocks.map((item, index) => {
        const row = item.row >= rows ? rows - 1 : item.row < 0 ? 0 : item.row;
        const column = item.column >= columns ? columns - 1 : item.column < 0 ? 0 : item.column;

        return (
          <div
            key={index}
            style={{
              top: `${row * rowStep}%`,
              left: `${column * columnStep}%`,
              width: `${rowStep}%`,
              height: `${columnStep}%`,
            }}
            className={`absolute bg-black-900 ${blockClassName} ${item.className}`}
          />
        );
      })}
      {new Array(rows - 1).fill(0).map((_, index) => {
        return (
          <div
            key={index}
            style={{ top: `${rowStep * (index + 1)}%` }}
            className={`absolute h-[0.5px] left-0 right-0 bg-gray-50 ${stickClassName}`}
          />
        );
      })}
      {new Array(columns - 1).fill(0).map((_, index) => {
        return (
          <div
            key={index}
            style={{ left: `${columnStep * (index + 1)}%` }}
            className={`absolute w-[0.5px] top-0 bottom-0 bg-gray-50 ${stickClassName}`}
          />
        );
      })}
    </div>
  );
}
