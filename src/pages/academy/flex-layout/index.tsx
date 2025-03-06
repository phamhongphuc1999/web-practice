import { Button, Collapse } from '@mui/material';
import { useState } from 'react';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ArrowAnimationIcon from 'src/components/Icons/ArrowAnimationIcon';
import ReactSeo from 'src/components/ReactSeo';
import { color1, color2, color3, color4, color5, color6, color7 } from 'src/configs/constance';
import { ROUTE } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import OrderDialog from './order-dialog';
import DirectionDialog from './direction-dialog';
import FlexGrowDialog from './flex-grow-dialog';

export default function FlexLayout() {
  const { t } = useLocalTranslate();
  const [open, setOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [directionOpen, setDirectionOpen] = useState(false);
  const [flexGrowOpen, setFlexGrowOpen] = useState(false);

  return (
    <>
      <ReactSeo title={`${t('academy')} | ${t('academy-item.flex-layout')}`} />
      <CssBreadcrumbs
        configs={[
          { label: t('academy'), link: ROUTE.ACADEMY },
          { label: t('academy-item.flex-layout'), isRemain: true },
        ]}
      />
      <div
        className="mt-[1rem] flex cursor-pointer items-center gap-1"
        onClick={() => setOpen((preValue) => !preValue)}
      >
        <p>Config</p>
        <ArrowAnimationIcon isTransform={open} />
      </div>
      <Collapse in={open} className="mt-[0.5rem]">
        <Button variant="outlined" onClick={() => setOrderOpen(true)}>
          Order config
        </Button>
        <Button
          sx={{ marginLeft: '0.5rem' }}
          variant="contained"
          onClick={() => setDirectionOpen(true)}
        >
          Direction config
        </Button>
        <Button
          sx={{ marginLeft: '0.5rem' }}
          variant="outlined"
          onClick={() => setFlexGrowOpen(true)}
        >
          Flex grow config
        </Button>
      </Collapse>
      <OrderDialog open={orderOpen} onClose={() => setOrderOpen(false)} />
      <DirectionDialog open={directionOpen} onClose={() => setDirectionOpen(false)} />
      <FlexGrowDialog open={flexGrowOpen} onClose={() => setFlexGrowOpen(false)} />
      <div
        id="flex-layout-container"
        style={{
          backgroundColor: color1,
          padding: '1rem',
          borderRadius: '16px',
          marginTop: '1rem',
        }}
        className="flex gap-2"
      >
        <div
          id="flex-layout-item1"
          style={{ backgroundColor: color2, width: '32px', height: '32px', borderRadius: '8px' }}
          className="flex items-center justify-center"
        >
          1
        </div>
        <div
          id="flex-layout-item2"
          style={{ backgroundColor: color3, width: '32px', height: '32px', borderRadius: '8px' }}
          className="flex items-center justify-center"
        >
          2
        </div>
        <div
          id="flex-layout-item3"
          style={{ backgroundColor: color4, width: '32px', height: '32px', borderRadius: '8px' }}
          className="flex items-center justify-center"
        >
          3
        </div>
        <div
          id="flex-layout-item4"
          style={{ backgroundColor: color5, width: '32px', height: '32px', borderRadius: '8px' }}
          className="flex items-center justify-center"
        >
          4
        </div>
        <div
          id="flex-layout-item5"
          style={{ backgroundColor: color6, width: '32px', height: '32px', borderRadius: '8px' }}
          className="flex items-center justify-center"
        >
          5
        </div>
        <div
          id="flex-layout-item6"
          style={{ backgroundColor: color7, width: '32px', height: '32px', borderRadius: '8px' }}
          className="flex items-center justify-center"
        >
          6
        </div>
      </div>
    </>
  );
}
