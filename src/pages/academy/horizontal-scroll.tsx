import { useMemo, WheelEvent } from 'react';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import { COLOR_ARRAY } from 'src/configs/constance';
import { ROUTE } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

export default function HorizontalScroll() {
  const { t } = useLocalTranslate();

  const items = useMemo(() => {
    return Array(100)
      .fill(0)
      .map((_, index) => {
        const _colorLen = COLOR_ARRAY.length;
        const color = COLOR_ARRAY[index % _colorLen];
        return { data: index + 1, color };
      });
  }, []);

  function onWheel(event: WheelEvent<HTMLDivElement>) {
    if (event.deltaY == 0) return;
    event.preventDefault();
    const currentTarget = event.currentTarget;
    currentTarget.scrollTo({ left: currentTarget.scrollLeft + event.deltaY, behavior: 'smooth' });
  }

  return (
    <>
      <CssBreadcrumbs
        configs={[
          { label: t('academy'), link: ROUTE.ACADEMY },
          { label: t('academy-item.horizontal-scroll'), isRemain: true },
        ]}
      />
      <div
        className="bg-black-100 mt-8 flex h-[100px] items-center gap-4 overflow-auto rounded-2xl px-4 whitespace-nowrap"
        onWheel={onWheel}
      >
        {items.map((item) => {
          return (
            <div key={item.data}>
              <span style={{ color: item.color }}>{`Item: ${item.data}`}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
