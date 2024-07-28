import { languageConfig } from 'src/configs/constance';
import { LanguageType } from 'src/global';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { setLanguage } from 'src/redux/user-slice';
import CssSelector, { CssSelectItem } from './CssSelector';

export default function LanguageSelector() {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.user);

  function onChooseItem(e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: CssSelectItem) {
    dispatch(setLanguage(item.id as LanguageType));
  }

  return (
    <CssSelector
      width={120}
      props={{ sx: { ml: 1 } }}
      items={Object.values(languageConfig)}
      defaultSelectedItem={languageConfig[language]}
      events={{ onChooseItem }}
    />
  );
}
