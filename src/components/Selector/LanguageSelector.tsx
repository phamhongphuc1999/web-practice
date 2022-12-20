import { useDispatch } from 'react-redux';
import { languageConfig, LanguageType } from 'src/configs/constance';
import { useAppSelector } from 'src/redux/hook';
import { setLanguage } from 'src/redux/userConfigSlice';
import CssSelector, { CssSelectItem } from './CssSelector';

export default function LanguageSelector() {
  const dispatch = useDispatch();
  const { language } = useAppSelector((state) => state.userConfigSlice);

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
