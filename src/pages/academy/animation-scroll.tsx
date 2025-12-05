import { Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import { ROUTE } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

export default function AnimationScroll() {
  const { t } = useLocalTranslate();

  function onScrollClick(id: string) {
    const element = document.getElementById(id);
    const position = element?.getBoundingClientRect();
    if (position && typeof window !== 'undefined') {
      window.scrollTo({
        left: position.left,
        top: position.top + window.scrollY - 54,
        behavior: 'smooth',
      });
    }
  }

  const onScroll = useCallback(() => {
    const element = document.getElementById('scrollable-board');
    let index = 0;
    if (element) {
      const items = element.getElementsByClassName('scrollable-item');
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const position = item.getBoundingClientRect();
        if (position.y < 100 && position.y + position.height > 54) {
          index = i;
        }
      }
      const buttons = document.getElementsByClassName('scroll-academy-item');
      if (buttons) {
        for (let i = 0; i < buttons.length; i++) {
          const button = buttons[i];
          if (i == index) button.classList.add('scroll-academy-item-active');
          else button.classList.remove('scroll-academy-item-active');
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <>
      <CssBreadcrumbs
        configs={[
          { label: t('academy'), link: ROUTE.ACADEMY },
          { label: t('academy-item.scroll-page'), isRemain: true },
        ]}
      />
      <div className="flex justify-between">
        <div className="sticky top-40 h-fit w-[440px]">
          <div className="scroll-academy-item" onClick={() => onScrollClick('option1')}>
            <div className="scroll-academy-item-tag mr-4 h-7 w-1 rounded-r-xl" />
            Option1
          </div>
          <div className="scroll-academy-item" onClick={() => onScrollClick('option2')}>
            <div className="scroll-academy-item-tag mr-4 h-7 w-1 rounded-r-xl" />
            Option2
          </div>
          <div className="scroll-academy-item" onClick={() => onScrollClick('option3')}>
            <div className="scroll-academy-item-tag mr-4 h-7 w-1 rounded-r-xl" />
            Option3
          </div>
          <div className="scroll-academy-item" onClick={() => onScrollClick('option4')}>
            <div className="scroll-academy-item-tag mr-4 h-7 w-1 rounded-r-xl" />
            Option4
          </div>
        </div>
        <div id="scrollable-board" className="w-[calc(100%-480px)]">
          <div id="option1" className="scrollable-item h-[300px]">
            <Typography variant="h2">Option1</Typography>
          </div>
          <div id="option2" className="scrollable-item mt-3 h-[600px]">
            <Typography variant="h2">Option2</Typography>
          </div>
          <div id="option3" className="scrollable-item mt-3 h-[900px]">
            <Typography variant="h2">Option3</Typography>
          </div>
          <div id="option4" className="scrollable-item mt-3 h-[1200px]">
            <Typography variant="h2">Option4</Typography>
          </div>
        </div>
      </div>
    </>
  );
}
