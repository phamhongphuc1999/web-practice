import { Helmet } from 'react-helmet';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

interface Props {
  title?: string;
}

export default function ReactSeo(params: Props) {
  const { title = '' } = params;
  const { t } = useLocalTranslate();

  return (
    <Helmet>
      <title>
        {t('title.root')}
        {title.length > 0 ? ` | ${title}` : ''}
      </title>
    </Helmet>
  );
}
