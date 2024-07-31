import { useMemo } from 'react';
import { languageConfig } from 'src/configs/constance';
import { LanguageType } from 'src/global';
import useTranslate from 'src/hooks/useTranslate';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { setLanguage } from 'src/redux/user-slice';
import CssSelector, { CssSelectItem } from './CssSelector';

export default function LanguageSelector() {
  const { t } = useTranslate();
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.user);

  const defaultSelectedItem = useMemo(() => {
    const data = languageConfig[language];
    return { id: data.id, label: t(data.label) };
  }, [language]);

  function onChooseItem(e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: CssSelectItem) {
    dispatch(setLanguage(item.id as LanguageType));
  }

  return (
    <CssSelector
      width={120}
      props={{ sx: { ml: 1 } }}
      items={Object.values(languageConfig).map((item) => ({ id: item.id, label: t(item.label) }))}
      defaultSelectedItem={defaultSelectedItem}
      events={{ onChooseItem }}
    />
  );
}
