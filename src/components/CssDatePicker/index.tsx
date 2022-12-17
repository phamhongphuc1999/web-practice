import {
  alpha,
  Box,
  BoxProps,
  Button,
  List,
  ListItem,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useMemo, useState } from 'react';
import useTranslate from 'src/hooks/useTranslate';
import { toFixed } from 'src/services';
import MainDatePicker, { DateType } from './MainDatePicker';

const DATE_PICKER_PREDEFINED = [
  { text: 'Last 7 days', value: 7 },
  { text: 'Last 14 days', value: 14 },
  { text: 'Last 30 days', value: 30 },
  { text: 'Last 60 days', value: 60 },
  { text: 'Last 90 days', value: 90 },
];

const useStyle = (theme: Theme) => ({
  listItem: {
    cursor: 'pointer',
    color: theme.palette.text.secondary,
    background: 'transparent',
    borderRadius: '6px',
    '&:hover': {
      background: theme.palette.mode === 'dark' ? '#FFFFFF0F' : 'rgba(0, 0, 0, 0.06)',
    },
  },
  activeItem: {
    background: theme.palette.primary.main,
    color: '#FFFFFF',
    boxShadow: `0 0 10px 1px ${alpha(theme.palette.primary.main, 0.6)}`,
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
});

interface Props {
  events?: {
    onPredefinedClick?: (value: number) => void;
    onCancelClick?: () => void;
    onContinueClick?: (start: DateType, end: DateType) => void;
  };
  props?: BoxProps;
}

export default function CssDatePicker({ events, props }: Props) {
  const theme = useTheme();
  const cls = useStyle(theme);
  const { t } = useTranslate();
  const [start, setStart] = useState<DateType>(null);
  const [end, setEnd] = useState<DateType>(null);
  const [selected, setSelected] = useState(-1);
  const match = useMediaQuery<Theme>((theme) => theme.breakpoints.only('xs'));

  const value = useMemo(() => {
    if (start && end) {
      const _temp = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
      return toFixed(_temp + 1);
    }
    return 1;
  }, [start, end]);

  function onPredefinedClick(index: number, value: number) {
    const currentDate = new Date();
    const _startDate = new Date();
    _startDate.setDate(_startDate.getDate() - value + 1);
    setStart(_startDate);
    setEnd(currentDate);
    setSelected(index);
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
          <Typography>{t('datePicker.predefinedDates')}</Typography>
          <List>
            {DATE_PICKER_PREDEFINED.map((element, index) => {
              return (
                <ListItem
                  sx={[cls.listItem, selected == index && cls.activeItem]}
                  key={index}
                  onClick={() => onPredefinedClick(index, element.value)}
                >
                  <Typography>{t('datePicker.lastDays', { days: element.value.toString() })}</Typography>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button variant="outlined" color="primary" onClick={() => onCancelClick()}>
          {t('cancel')}
        </Button>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          {!match && (
            <Typography sx={{ paddingRight: '1rem' }}>
              Selected: <span>{value <= 1 ? `${value} day` : `${value} days`}</span>
            </Typography>
          )}
          <Button variant="contained" color="primary" onClick={() => onContinueClick()}>
            {t('continue')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
