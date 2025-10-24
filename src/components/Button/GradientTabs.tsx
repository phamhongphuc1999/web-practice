import { ComponentProps, ReactNode } from 'react';
import { cn } from 'src/lib/utils';

type ItemType = {
  id: string;
  children: ReactNode;
};

interface Props extends ComponentProps<'div'> {
  tabs: Array<ItemType>;
  activeTabs: string;
  events?: {
    onClick?: (tab: string) => void;
  };
}

export default function GradientTabs({ tabs, activeTabs, events, ...props }: Props) {
  function _onClick(tab: string) {
    if (events?.onClick) events.onClick(tab);
  }

  return (
    <div
      className={cn('gradient-tabs-border relative w-fit rounded-full p-[1px]', props.className)}
    >
      <div className="flex items-center rounded-full bg-gradient-to-b from-[#1a1a1a] to-[#000000] p-2 shadow-[0px_1px_9.8px_0px_#59595936]">
        {tabs.map((tab) => {
          return (
            <button
              key={tab.id}
              onClick={() => _onClick(tab.id)}
              className={cn(
                'cursor-pointer rounded-[100px] px-8 py-3 transition-all',
                activeTabs == tab.id
                  ? 'border-[#DD73CCA3] bg-gradient-to-b from-[#772B87] to-[#300926] text-[#ffffff] hover:bg-[#DD73CC70]/50'
                  : 'text-[#ACB5BB] hover:bg-[#000000]/50'
              )}
            >
              {tab.children}
            </button>
          );
        })}
      </div>
    </div>
  );
}
