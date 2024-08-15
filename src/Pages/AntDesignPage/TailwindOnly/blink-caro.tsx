import { useEffect, useMemo, useState } from 'react';
import { CssCaroProps } from 'src/components/css-caro/normal-css-caro';
import RandomCaro from 'src/components/css-caro/random-caro';

export default function BlinkCaro(props: Partial<Omit<CssCaroProps, 'blocks'>>) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let fn: NodeJS.Timeout | undefined = undefined;
    fn = setInterval(() => {
      setCounter((preValue) => {
        if (preValue >= 50) return 10;
        else return preValue + 1;
      });
    }, 2000);
    return () => clearInterval(fn);
  }, []);

  return useMemo(() => {
    return (
      <RandomCaro
        rows={10}
        columns={10}
        stickClassName="bg-[red]"
        className="mt-5 bg-grey-150 w-[400px] h-[400px] rounded-[16px] border-[red]"
        {...props}
        selectedBlock={counter}
      />
    );
  }, [counter]);
}
