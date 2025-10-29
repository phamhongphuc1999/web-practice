import { ReactNode, useMemo } from 'react';
import { DivProps } from 'src/global';
import { cn } from 'src/lib/utils';

export interface GroupButtonItemProps {
  id: string;
  content: ReactNode;
  width?: number;
}

export interface StickyGroupButtonItemProps {
  id: string;
  content: ReactNode;
  width: number;
  position: number;
}

interface Props extends DivProps {
  selectedId: string;
  selectedClassname?: string;
  options: Array<GroupButtonItemProps>;
  events?: {
    onOptionChange?: (id: string) => void;
  };
}

export default function GroupButton(params: Props) {
  const { selectedId, options, events, selectedClassname, ...props } = params;

  const jsonOptions = useMemo(() => {
    const result: { [key: string]: StickyGroupButtonItemProps } = {};
    let position = 0;
    for (const option of options) {
      result[option.id] = { ...option, position, width: option.width ?? 40 };
      position += option.width ?? 40;
    }
    return result;
  }, [options]);

  function onOptionChange(id: string) {
    if (events?.onOptionChange) events.onOptionChange(id);
  }

  return (
    <div
      {...props}
      className={cn(
        'bg-grey-100 relative inline-flex cursor-pointer items-center rounded-xl',
        props?.className
      )}
    >
      <div
        className="bg-black-50 absolute h-full rounded-xl opacity-25 transition-all"
        style={{
          width: `${jsonOptions[selectedId].width}px`,
          left: `${jsonOptions[selectedId].position}px`,
        }}
      />
      {Object.values(options).map((item) => {
        return (
          <div
            key={item.id}
            className={cn(
              'flex items-center justify-center px-2 py-4 text-center',
              selectedId && selectedClassname
            )}
            style={{ width: `${item.width ?? 40}px` }}
            onClick={() => onOptionChange(item.id)}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
}
