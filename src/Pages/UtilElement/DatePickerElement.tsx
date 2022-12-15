import { Grid, Typography } from '@mui/material';
import { useState } from 'react';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import CssDatePicker from 'src/components/CssDatePicker';
import { DateType } from 'src/components/CssDatePicker/MainDatePicker';
import { ROUTE } from 'src/configs/constance';

export default function DatePickerElement() {
  const [start, setStart] = useState<DateType>(undefined);
  const [end, setEnd] = useState<DateType>(undefined);
  const [event, setEvent] = useState('');

  function onPredefinedClick(_: number) {
    setEvent('onPredefined');
  }

  function onCancelClick() {
    setEvent('onCancel');
  }

  function onContinueClick(start: DateType, end: DateType) {
    setStart(start);
    setEnd(end);
    setEvent('onContinue');
  }

  return (
    <>
      <CssBreadcrumbs configs={[{ label: 'Utils', link: ROUTE.UTILS }, { label: 'date picker' }]} props={{ mb: 2 }} />
      <Grid container>
        <Grid item sm={6} xs={12}>
          <CssDatePicker props={{ maxWidth: '450px' }} events={{ onPredefinedClick, onCancelClick, onContinueClick }} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Typography>Selected start date: {start?.toLocaleString() ?? ''}</Typography>
          <Typography>Selected end date: {end?.toLocaleString() ?? ''}</Typography>
          <Typography>Event: {event}</Typography>
        </Grid>
      </Grid>
    </>
  );
}
