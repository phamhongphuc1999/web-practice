import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';
import { AcademyConfig } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

export default function Academy() {
  const { t } = useLocalTranslate();

  return (
    <div>
      <ReactSeo title={t('academy')} />
      <CssBreadcrumbs configs={[{ label: t('academy') }]} mb={2} />
      <div className="mt-[1rem]">
        {AcademyConfig.map((item, index) => {
          return (
            <Box key={index} sx={{ marginTop: '8px' }}>
              <Link to={item.link}>
                <Typography>{`${index + 1}: ${t(item.title)}`}</Typography>
              </Link>
            </Box>
          );
        })}
      </div>
    </div>
  );
}
