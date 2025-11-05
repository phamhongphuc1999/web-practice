import { useState } from 'react';
import AppCounter from 'src/components/reactbits/AppCounter';
import { Button } from 'src/components/shadcn-ui/button';

export default function AppCounterElement() {
  const [value, setValue] = useState(1);

  return (
    <div className="mt-2 rounded-md border p-2">
      <AppCounter
        value={value}
        places={[100, 10, 1]}
        fontSize={80}
        textColor="white"
        fontWeight={900}
      />
      <Button onClick={() => setValue((preValue) => preValue + 1)}>Count</Button>
    </div>
  );
}
