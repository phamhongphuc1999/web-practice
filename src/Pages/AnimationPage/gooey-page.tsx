import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import { ColorfulGooeyBox, GooeyBox } from 'src/components/animation-component/Gooey';
import { ROUTE } from 'src/configs/constance';
import useTranslate from 'src/hooks/useTranslate';
import Item from './item';

export default function GooeyPage() {
  const { t } = useTranslate();
  const { page } = useParams<{ page?: string }>();

  return (
    <>
      <CssBreadcrumbs
        configs={[
          { label: t('animation'), link: `${ROUTE.ANIMATION}/${page}` },
          { label: t('animationGooey') },
        ]}
      />
      <Box display="flex" flexWrap="wrap">
        <Item
          label="Gooey"
          Icon={<GooeyBox props={{ mt: 2 }} iconProps={{ opposite: false, size: '150px' }} />}
        />
        <Item
          label="Contained gooey"
          Icon={<GooeyBox type="contained" props={{ mt: 2 }} iconProps={{ size: '150px' }} />}
        />
        <Item
          label="Colorful gooey"
          Icon={<ColorfulGooeyBox props={{ mt: 2 }} iconProps={{ size: '150px' }} />}
        />
        <Item
          label="Opposite gooey"
          Icon={<GooeyBox props={{ mt: 2 }} iconProps={{ opposite: true, size: '150px' }} />}
        />
        <Item
          label="Opposite colorful gooey"
          Icon={
            <ColorfulGooeyBox props={{ mt: 2 }} iconProps={{ opposite: true, size: '150px' }} />
          }
        />
      </Box>
    </>
  );
}
