import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import { GooeyBox } from 'src/components/animation-component/Gooey';
import { ROUTE } from 'src/configs/constance';
import useTranslate from 'src/hooks/useTranslate';
import { sleep } from 'src/services';
import Item from './item';

export default function GooeyPage() {
  const { t } = useTranslate();
  const [amount, setAmount] = useState('4');
  const [sMin, setSMin] = useState('0.25');
  const [numberOfItems, setNumberOfItems] = useState(4);
  const [min, setMin] = useState(0.75);
  const [loading, setLoading] = useState(false);
  const { page } = useParams<{ page?: string }>();

  async function onParamsChange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await sleep(200);
    setNumberOfItems(parseInt(amount));
    setMin(parseFloat(sMin));
    setLoading(false);
  }

  return (
    <>
      <CssBreadcrumbs
        configs={[
          { label: t('animation'), link: `${ROUTE.ANIMATION}/${page}` },
          { label: t('animationGooey') },
        ]}
      />
      <form onSubmit={(event) => onParamsChange(event)}>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Box sx={{ width: '150px' }}>Number of items</Box>
          <TextField
            value={amount}
            type="number"
            size="small"
            fullWidth
            onChange={(event) => setAmount(event.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Box sx={{ width: '150px' }}>Min</Box>
          <TextField
            value={sMin}
            type="number"
            size="small"
            fullWidth
            onChange={(event) => setSMin(event.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button type="submit" sx={{ marginLeft: '1rem' }} variant="contained" color="primary">
            Confirm
          </Button>
        </Box>
      </form>
      {loading ? (
        <>Loading...</>
      ) : (
        <Box display="flex" flexWrap="wrap">
          <Item
            label="Gooey"
            Icon={
              <GooeyBox
                props={{ mt: 2 }}
                iconProps={{ opposite: false, size: '150px', numberOfItems, min }}
              />
            }
          />
          <Item
            label="Opposite gooey"
            Icon={
              <GooeyBox
                props={{ mt: 2 }}
                iconProps={{ opposite: true, size: '150px', numberOfItems, min }}
              />
            }
          />
        </Box>
      )}
    </>
  );
}
