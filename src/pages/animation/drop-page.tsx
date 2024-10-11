import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';
import PieceDropAnimation from 'src/components/animation-component/piece-drop-animation';
import { ROUTE } from 'src/configs/constance';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

export default function DropPage() {
  const { t } = useLocalTranslate();
  const { page } = useParams<{ page?: string }>();
  const [amount, setAmount] = useState('50');
  const [numberOfItems, setNumberOfItems] = useState(50);

  async function onNumberOfItemsChange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNumberOfItems(parseInt(amount));
  }

  return (
    <>
      <ReactSeo title={`${t('animation')} | ${t('drop')}`} />
      <CssBreadcrumbs
        configs={[
          { label: t('animation'), link: `${ROUTE.ANIMATION}/${page}` },
          { label: t('drop') },
        ]}
      />
      <Box sx={{ position: 'relative', height: '100vh' }}>
        <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0 }}>
          <PieceDropAnimation
            numberOfPieces={numberOfItems}
            metadata={{ durationStart: 13 }}
            sx={{ width: '100%', height: '100%' }}
          />
        </Box>
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
      </Box>
    </>
  );
}
