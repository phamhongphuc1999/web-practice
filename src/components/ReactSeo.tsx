import { Helmet } from 'react-helmet';

interface Props {
  title?: string;
}

export default function ReactSeo(params: Props) {
  const { title = 'My Web Practice' } = params;

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
