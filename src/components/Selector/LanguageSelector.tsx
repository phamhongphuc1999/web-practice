import { useMemo } from 'react';
import { languageConfig } from 'src/configs/constance';
import { LanguageType } from 'src/global';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { setLanguage } from 'src/redux/config-slice';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import CssSelector, { CssSelectItem } from './CssSelector';

export default function LanguageSelector() {
  const { t } = useLocalTranslate();
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.config);

  const defaultSelectedItem = useMemo(() => {
    const data = languageConfig[language];
    return { id: data.id, label: t(data.label) };
  }, [language]);

  function onChooseItem(_: React.MouseEvent<HTMLLIElement, MouseEvent>, item: CssSelectItem) {
    dispatch(setLanguage(item.id as LanguageType));
  }

  return (
    <CssSelector
      width={120}
      ml={1}
      items={Object.values(languageConfig).map((item) => ({ id: item.id, label: t(item.label) }))}
      defaultSelectedItem={defaultSelectedItem}
      events={{ onChooseItem }}
    />
  );
}
