import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import vi from './resources/vi.json';
import en from './resources/en.json';

const resources = {
	vi: { translation: vi },
	en: { translation: en }
}

const languages = [
	{
		code: 'vi',
		name: 'Vietnamese(Việt Nam)'
	},
	{
		code: 'en',
		name: 'English (US)',
	}
];

i18n.use(initReactI18next).init({
	resources,
	lng: 'vi',
	fallbackLng: 'vi',
});

export { languages };

export default i18n;
