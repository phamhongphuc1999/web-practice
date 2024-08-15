import { useState } from 'react';
import RandomCaro from 'src/components/css-caro/random-caro';
import BlinkCaro from './blink-caro';

export default function CaroBox() {
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);
  const [selected, setSelected] = useState(10);

  function onRowsChange(rows: string) {
    const _rows = parseInt(rows);
    if (isNaN(_rows) || _rows <= 1) setRows(1);
    else setRows(_rows);
  }

  function onColumnsChange(columns: string) {
    const _columns = parseInt(columns);
    if (isNaN(_columns) || _columns <= 1) setColumns(1);
    else setColumns(_columns);
  }

  function onSelectedChange(selected: string) {
    const _selected = parseInt(selected);
    if (isNaN(_selected) || _selected <= 1) setSelected(1);
    else setSelected(_selected);
  }

  return (
    <div className="mt-5">
      <div className="flex items-center gap-x-4">
        <div className="w-[5rem]">
          <p>Rows</p>
        </div>
        <input
          type="integer"
          className="text-[#000000] h-[2rem] px-2"
          value={rows}
          onChange={(event) => onRowsChange(event.target.value)}
        />
      </div>
      <div className="flex items-center gap-x-4 mt-3">
        <div className="w-[5rem]">
          <p>Columns</p>
        </div>
        <input
          type="integer"
          className="text-[#000000] h-[2rem] px-2"
          value={columns}
          onChange={(event) => onColumnsChange(event.target.value)}
        />
      </div>
      <div className="flex items-center gap-x-4 mt-3">
        <div className="w-[5rem]">
          <p>Selected</p>
        </div>
        <input
          type="integer"
          className="text-[#000000] h-[2rem] px-2"
          value={selected}
          onChange={(event) => onSelectedChange(event.target.value)}
        />
      </div>
      <div className="flex items-center gap-x-4">
        <RandomCaro
          selectedBlock={selected}
          rows={rows}
          columns={columns}
          stickClassName="bg-[red]"
          className="mt-5 bg-grey-150 w-[400px] h-[400px] rounded-[16px] border-[red]"
        />
        <BlinkCaro rows={rows} columns={columns} />
      </div>
    </div>
  );
}
