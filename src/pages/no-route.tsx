import SickOutlinedIcon from '@mui/icons-material/SickOutlined';
import { Link } from 'react-router-dom';
import ReactSeo from 'src/components/ReactSeo';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

export default function NoRoute() {
  const { t } = useLocalTranslate();

  return (
    <div>
      <ReactSeo />
      <div className="mt-8 flex flex-col items-center justify-center">
        <SickOutlinedIcon sx={{ fontSize: '30px' }} />
        <p className="mt-4 text-[40px]">404</p>
        <p className="mt-4 text-[45px]">{t('no-route.title')}</p>
        <Link to="/">{t('no-route.goBack')}</Link>
      </div>
    </div>
  );
}
