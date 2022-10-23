import { Box, BoxProps, Button, List, ListItem, Theme, Typography, useMediaQuery } from '@mui/material';
import { useMemo, useState } from 'react';
import { toFixed } from 'src/services';
import MainDatePicker, { DateType } from './MainDatePicker';

const DATE_PICKER_PREDEFINED = [
  { text: 'Last 7 days', value: 7 },
  { text: 'Last 14 days', value: 14 },
  { text: 'Last 30 days', value: 30 },
  { text: 'Last 60 days', value: 60 },
  { text: 'Last 90 days', value: 90 },
];

interface Props {
  events?: {
    onPredefinedClick?: (value: number) => void;
    onCancelClick: () => void;
    onContinueClick: (start: DateType, end: DateType) => void;
  };
  props?: BoxProps;
}

export default function CssDatePicker({ events, props }: Props) {
  const [start, setStart] = useState<DateType>(null);
  const [end, setEnd] = useState<DateType>(null);
  const match = useMediaQuery<Theme>((theme) => theme.breakpoints.only('xs'));

  const value = useMemo(() => {
    if (start && end) {
      const _temp = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
      return toFixed(_temp + 1);
    }
    return 1;
  }, [start, end]);

  function onPredefinedClick(value: number) {
    const currentDate = new Date();
    const _startDate = new Date();
    _startDate.setDate(_startDate.getDate() - value + 1);
    setStart(_startDate);
    setEnd(currentDate);
    if (events?.onPredefinedClick) events.onPredefinedClick(value);
  }

  function onCancelClick() {
    setStart(null);
    setEnd(null);
    if (events?.onCancelClick) events.onCancelClick();
  }

  function onContinueClick() {
    if (events?.onContinueClick) events.onContinueClick(start, end);
  }

  return (
    <Box {...props}>
      <Box display="flex" mb={2}>
        <MainDatePicker {...{ start, setStart, end, setEnd }} />
        <Box pt={1} pr={1} pl={1}>
          <Typography>Predefined dates</Typography>
          <List>
            {DATE_PICKER_PREDEFINED.map((element, index) => {
              return (
                <ListItem key={index} onClick={() => onPredefinedClick(element.value)}>
                  <Typography>{element['text']}</Typography>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button variant="outlined" color="primary" onClick={() => onCancelClick()}>
          Cancel
        </Button>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          {!match && (
            <Typography>
              Selected: <span>{value <= 1 ? `${value} day` : `${value} days`}</span>
            </Typography>
          )}
          <Button variant="contained" color="primary" onClick={() => onContinueClick()}>
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
