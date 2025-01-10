import { ChangeEvent, useEffect, useState } from 'react';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';
import TitleTypography from 'src/components/typography/TitleTypography';
import { ROUTE } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

export default function TransitionDelay() {
  const { t } = useLocalTranslate();
  const [value, setValue] = useState('');
  const [transitionValue, setTransitionValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(5);

  function onTextChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  useEffect(() => {
    setTimeLeft(5);
    const _interval = setInterval(() => {
      setTimeLeft((preValue) => {
        if (preValue > 0) return preValue - 1;
        else return preValue;
      });
    }, 1000);
    return () => clearInterval(_interval);
  }, [value]);

  useEffect(() => {
    const _delay = setTimeout(() => {
      setTransitionValue(value);
    }, 5000);

    return () => clearTimeout(_delay);
  }, [value]);

  return (
    <div>
      <ReactSeo title={`${t('academy')} | ${t('academy-item.transition')}`} />
      <CssBreadcrumbs
        configs={[
          { label: t('academy'), link: ROUTE.ACADEMY },
          { label: t('academy-item.transition') },
        ]}
        mb={2}
      />
      <div className="mt-[1rem]">
        <input
          className="h-[55px] rounded-[16px] border-[1px] border-blue-50 bg-black-200 px-[1rem]"
          onChange={onTextChange}
        />
        <div className="mt-[2rem] flex flex-col">
          <TitleTypography
            className="border-t-[1px] border-blue-50 pt-[8px]"
            title={t('value')}
            titleProps={{ className: 'w-[120px]' }}
          >
            <p>{value}</p>
          </TitleTypography>
          <TitleTypography
            className="mt-[1rem] border-t-[1px] border-blue-50 pt-[8px]"
            title={t('delay-value')}
            titleProps={{ className: 'w-[120px]' }}
          >
            <p>{transitionValue}</p>
          </TitleTypography>
          <TitleTypography
            className="mt-[1rem] border-t-[1px] border-blue-50 pt-[8px]"
            title={t('time-left')}
            titleProps={{ className: 'w-[120px]' }}
          >
            <p>{timeLeft}</p>
          </TitleTypography>
        </div>
      </div>
    </div>
  );
}
