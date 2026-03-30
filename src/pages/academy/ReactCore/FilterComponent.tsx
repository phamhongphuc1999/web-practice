import { ChangeEvent, useState } from 'react';

interface Props {
  onFilterChange: (value: string) => void;
}

function FilterComponent({ onFilterChange }: Props) {
  const [input, setInput] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // High-priority update
    onFilterChange(value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search car..."
        value={input}
        onChange={handleChange}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
    </div>
  );
}

export default FilterComponent;
