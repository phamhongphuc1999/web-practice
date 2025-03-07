/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, BoxProps, Theme } from '@mui/material';
import { useMemo } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const datepicker = (theme: Theme) => ({
  '& .react-datepicker': {
    background: 'transparent',
    border: 'none',
  },
  '& .react-datepicker__navigation-icon--previous, .react-datepicker__navigation-icon--next': {
    '&::before': {
      borderColor: theme.palette.text.secondary,
    },
  },
  '& .react-datepicker__header': {
    background: 'transparent',
    borderBottom: 'none',
    '& .react-datepicker__current-month': {
      color: theme.palette.text.secondary,
    },
    '& .react-datepicker__day-names': {
      '& .react-datepicker__day-name': {
        color: theme.palette.text.primary,
        width: '2.5rem',
        height: '2.5rem',
        margin: 0,
      },
    },
  },
  '& .react-datepicker__day': {
    borderRadius: '50%',
    color: theme.palette.text.secondary,
    fontSize: '14px',
    fontWeight: 450,
    margin: 0,
    width: '2.5rem',
    height: '2.5rem',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      background:
        theme.palette.mode === 'dark' ? 'rgba(121, 148, 193, 0.5)' : 'rgba(86, 100, 116, 0.2)',
    },
  },
  '& .react-datepicker__day--disabled': {
    color: theme.palette.text.disabled,
  },
  '& .react-datepicker__day--selected, .react-datepicker__day--in-range': {
    color: '#FFFFFF',
    background: theme.palette.primary.main,
    '&:hover': {
      background: `${theme.palette.primary.main} !important`,
    },
  },
  '& .react-datepicker__day--in-range': {
    borderRadius: '0px',
    '&:hover': {
      borderRadius: '50%',
    },
  },
  '& .react-datepicker__day--range-start': {
    borderRadius: '6px 0px 0px 6px',
  },
  '& .react-datepicker__day--range-end': {
    borderRadius: '0px 6px 6px 0px',
  },
});

interface Props extends BoxProps {
  start?: Date;
  setStart: (date?: Date) => void;
  end?: Date;
  setEnd: (date?: Date) => void;
  monthsShow?: number;
}

export default function MainDatePicker(params: Props) {
  const { start, setStart, end, setEnd, monthsShow = 24, ...props } = params;

  function onChange(date: [Date | null, Date | null], _: React.SyntheticEvent<any> | undefined) {
    if (Array.isArray(date)) {
      const [start, end] = date;
      setStart(start ?? undefined);
      setEnd(end ?? undefined);
    } else {
      setStart(date);
      setEnd(undefined);
    }
  }

  const { minDate, maxDate } = useMemo(() => {
    const maxDate = new Date();
    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() - monthsShow);
    return { maxDate: maxDate, minDate: new Date(minDate) };
  }, [monthsShow]);

  return (
    <Box {...props} sx={datepicker}>
      <ReactDatePicker
        selected={start}
        onChange={onChange}
        startDate={start}
        endDate={end}
        minDate={minDate}
        maxDate={maxDate}
        selectsRange={true}
        inline={true}
      />
    </Box>
  );
}
