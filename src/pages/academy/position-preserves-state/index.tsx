import { useRef, useState } from 'react';
import Counter from './Counter';

export default function PositionPreservesState() {
  const [isFancy, setIsFancy] = useState(false);
  const [counter, setCounter] = useState(0);
  const ref = useRef(0);

  return (
    <div>
      <p className="italic text-[green]">
        Counter has key to identify exact component position. As you see, when switching fancy, the
        counter's state is reset. It cause because we label key for each counter (uncheck counter
        and check counter that are represent uncheck and check fancy respectively), so DOM recognize
        they are two distinguished components.
      </p>
      {isFancy ? <Counter key={1} isFancy={true} /> : <Counter key={2} isFancy={false} />}
      <div className="my-[1rem] h-[1px] w-[3rem] bg-[red]" />
      <p className="italic text-[red]">
        Counter without key is identified as a same component when switching fancy state. Thus, when
        you change check state, you see the state is not reset.
      </p>
      {isFancy ? <Counter isFancy={true} /> : <Counter isFancy={false} />}
      <label>
        <input
          className="mt-[1rem]"
          type="checkbox"
          checked={isFancy}
          onChange={(e) => {
            setIsFancy(e.target.checked);
          }}
        />
        Use fancy styling
      </label>

      <p className="mt-[1rem] italic text-[yellow]">
        In many case (in particular, you want to display a array of items), the key is critical
        factor. Sometimes, you cause nowhere errors if you mark key as index of array that can
        change value. It causes DOM see the item as a new component, can be caused some unexpected
        errors.
      </p>
      <div className="mt-[1rem]">
        <p>{`State counter: ${counter}`}</p>
        <p>{`Ref counter: ${ref.current}`}</p>
        <button
          className="border-[1px] border-[green]"
          onClick={() => setCounter((preValue) => preValue + 1)}
        >
          change state counter
        </button>
        <button
          className="ml-[0.5rem] border-[1px] border-[green]"
          onClick={() => (ref.current += 1)}
        >
          change ref counter
        </button>
        <p className="mt-[1rem] italic text-[yellow]">
          The above example illustrate the different between state and ref in react. When you press
          'change state counter' button, the state is triggered and application change user's scene.
          In additionally, when you press 'change ref counter', nothing happens, it is because ref
          is just plain javascript object, it does not trigger rerendering process. However, if you
          press 'change ref counter' first and then press 'change state counter', you will see first
          nothing changes, but after clicking the 'change state counter' button, both state counter
          and ref counter change to its current value. The reason causing the phenomenon is state
          trigger rerendering process, DOM look for change of components and redisplay correct
          component's state and value, including ref value.
        </p>
      </div>
    </div>
  );
}
