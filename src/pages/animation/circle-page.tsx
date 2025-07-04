import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';
import { CircleRingBox } from 'src/components/animation-component/CircleRing';
import { ROUTE } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { sleep } from 'src/services';
import Item from './item';

export default function CirclePage() {
  const { t } = useLocalTranslate();
  const [amount, setAmount] = useState('4');
  const [numberOfItems, setNumberOfItems] = useState(4);
  const [loading, setLoading] = useState(false);
  const { page } = useParams<{ page?: string }>();

  async function onNumberOfItemsChange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await sleep(200);
    setNumberOfItems(parseInt(amount));
    setLoading(false);
  }

  return (
    <>
      <ReactSeo title={`${t('animation')} | ${t('animationCircle')}`} />
      <CssBreadcrumbs
        configs={[
          { label: t('animation'), link: `${ROUTE.ANIMATION}/${page}` },
          { label: t('animationCircle') },
        ]}
      />
      <form onSubmit={(event) => onNumberOfItemsChange(event)}>
        <Box sx={{ display: 'flex' }}>
          <TextField
            value={amount}
            type="number"
            size="small"
            fullWidth
            onChange={(event) => setAmount(event.target.value)}
          />
          <Button type="submit" sx={{ marginLeft: '1rem' }} variant="contained" color="primary">
            {t('confirm')}
          </Button>
        </Box>
      </form>
      {loading ? (
        <>Loading...</>
      ) : (
        <Box display="flex" flexWrap="wrap">
          <Item
            label={`Ring${numberOfItems}`}
            Icon={<CircleRingBox className="mt-2" iconProps={{ size: '150px', numberOfItems }} />}
          />
          <Item
            label={`Square${numberOfItems}`}
            Icon={
              <CircleRingBox
                className="mt-2"
                iconProps={{ size: '150px', mode: 'square', numberOfItems }}
              />
            }
          />
          <Item
            label={`Dynamic${numberOfItems}`}
            Icon={
              <CircleRingBox
                className="mt-2"
                iconProps={{ size: '150px', mode: 'dynamic', numberOfItems }}
              />
            }
          />
        </Box>
      )}
    </>
  );
}
