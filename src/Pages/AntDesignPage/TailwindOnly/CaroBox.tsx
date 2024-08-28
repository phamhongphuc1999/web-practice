import { BasicCaro, GridCaro } from '@peter-present/led-caro';
import { useState } from 'react';
import { DivProps } from 'src/global';
import './CaroBox.style.css';

export default function CaroBox(props: DivProps) {
  const [rows, setRows] = useState(5);
  const [columns, setColumns] = useState(5);

  function onRowsChange(value: string) {
    const _rows = parseInt(value);
    if (isNaN(_rows) || _rows <= 1) setRows(0);
    else setRows(_rows);
  }

  function onColumnsChange(value: string) {
    const _columns = parseInt(value);
    if (isNaN(_columns) || _columns <= 1) setColumns(0);
    else setColumns(_columns);
  }

  return (
    <div {...props}>
      <div>
        <div className="flex items-center gap-x-4">
          <p>Rows</p>
          <input
            type="integer"
            className="text-[#000000] h-[2rem] px-2"
            value={rows}
            onChange={(event) => onRowsChange(event.target.value)}
          />
        </div>
        <div className="flex items-center gap-x-4 mt-4">
          <p>Columns</p>
          <input
            type="integer"
            className="text-[#000000] h-[2rem] px-2"
            value={columns}
            onChange={(event) => onColumnsChange(event.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <BasicCaro className="caro-box" rows={rows} columns={columns} />
        <GridCaro
          className="caro-box"
          rows={rows}
          columns={columns}
          gridProps={{ className: 'grid-item' }}
          squares={{
            'even-even': { style: { backgroundColor: '#f8b500', border: 'none' } },
            'even-odd': { style: { backgroundColor: '#fceabb', border: 'none' } },
            'odd-even': { style: { backgroundColor: '#ffde21', border: 'none' } },
            'odd-odd': { style: { backgroundColor: '#ffea99', border: 'none' } },
          }}
        />
      </div>
    </div>
  );
}
