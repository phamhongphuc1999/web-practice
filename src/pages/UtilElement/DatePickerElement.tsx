import { Grid2, Typography } from '@mui/material';
import { useState } from 'react';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import CssDatePicker from 'src/components/CssDatePicker';
import { ROUTE } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

export default function DatePickerElement() {
  const [start, setStart] = useState<Date | undefined>(undefined);
  const [end, setEnd] = useState<Date | undefined>(undefined);
  const [event, setEvent] = useState('');
  const { t } = useLocalTranslate();

  function onPredefinedClick(_: number) {
    setEvent('onPredefined');
  }

  function onCancelClick() {
    setEvent('onCancel');
  }

  function onContinueClick(start: Date, end: Date) {
    setStart(start);
    setEnd(end);
    setEvent('onContinue');
  }

  return (
    <>
      <CssBreadcrumbs
        configs={[{ label: t('utils'), link: ROUTE.UTILS }, { label: t('datePicker.title') }]}
        mb={2}
      />
      <Grid2 container>
        <Grid2 size={{ sm: 6, xs: 12 }}>
          <CssDatePicker
            maxWidth="450px"
            events={{ onPredefinedClick, onCancelClick, onContinueClick }}
          />
        </Grid2>
        <Grid2 size={{ sm: 6, xs: 12 }}>
          <Typography>{`${t('startDate')}: ${start?.toLocaleString() ?? ''}`}</Typography>
          <Typography>{`${t('endDate')}: ${end?.toLocaleString() ?? ''}`}</Typography>
          <Typography>{`${t('event')}: ${event}`}</Typography>
        </Grid2>
      </Grid2>
    </>
  );
}
