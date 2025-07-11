import {
  Box,
  Button,
  Container,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import GroupButton from 'src/components/Button/group-button';
import { CircleRingBox } from 'src/components/animation-component/CircleRing';
import Carousel from 'src/components/carousel';
import { ROUTE } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

interface Props {
  number: number;
}

function Item({ number }: Props) {
  return (
    <Box sx={{ border: '1px solid red' }}>
      <CircleRingBox className="mt-2" iconProps={{ size: '150px', numberOfItems: number }} />
    </Box>
  );
}

export default function CarouselElement() {
  const { t } = useLocalTranslate();
  const [mode, setMode] = useState('normal');
  const [location, setLocation] = useState(0);
  const [isArrow, setIsArrow] = useState(true);
  const [isInterval, setIsInterval] = useState(false);
  const [interval, setInterval] = useState('0');

  const [realInterval, setRealInterval] = useState(0);

  function onSubmit() {
    setRealInterval(parseInt(interval));
  }

  return (
    <Container>
      <CssBreadcrumbs
        configs={[{ label: t('utils'), link: ROUTE.UTILS }, { label: t('datePicker.title') }]}
        mb={2}
      />
      <Typography>{location + 1}</Typography>
      <GroupButton
        selectedId={mode}
        options={[
          { id: 'normal', content: 'normal', width: 60 },
          { id: 'linear', content: 'linear', width: 80 },
          { id: 'circle', content: 'circle', width: 70 },
        ]}
        events={{ onOptionChange: (id) => setMode(id) }}
      />
      <FormGroup onSubmit={onSubmit}>
        <FormControlLabel
          control={<Switch checked={isArrow} onClick={() => setIsArrow(!isArrow)} />}
          label="Is Arrow"
        />
        <FormControlLabel
          control={<Switch checked={isInterval} onClick={() => setIsInterval(!isInterval)} />}
          label="Is Auto"
        />
        <TextField
          value={interval}
          type="number"
          size="small"
          fullWidth
          onChange={(event) => setInterval(event.target.value)}
        />
        <Button type="submit" sx={{ marginLeft: '1rem' }} variant="contained" color="primary">
          {t('confirm')}
        </Button>
      </FormGroup>
      <Carousel
        sx={{ height: '100px' }}
        location={location}
        events={{ setLocation }}
        items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, _) => (
          <Item key={item} number={item} />
        ))}
        metadata={{
          isArrow,
          interval: isInterval ? realInterval : undefined,
          mode: mode as 'normal' | 'circle' | 'linear',
        }}
      />
    </Container>
  );
}
