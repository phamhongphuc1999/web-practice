import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';
import { AcademyConfig } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

export default function Academy() {
  const { t } = useLocalTranslate();
  const [number, setNumber] = useState(0);

  useEffect(() => {
    if (number > 0) {
      const abc = setTimeout(() => {
        alert(number);
      }, 3000);

      return () => clearTimeout(abc);
    }
  }, [number]);

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

      <h1>{number}</h1>
      <button onClick={() => setNumber((prev) => prev + 5)}>+5</button>
    </div>
  );
}
