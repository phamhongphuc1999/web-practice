import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { TimeType } from 'src/global';

export const defaultTime: TimeType = { days: '00', hours: '00', minutes: '00', seconds: '00' };

export interface CountdownProps {
  endAt: number | string;
  onMomentChange?: () => void;
}

export default function useCountdown({ endAt, onMomentChange }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeType>(defaultTime);
  const [isDone, setIsDone] = useState(false);

  const formatTimeLessThanTen = (time: number): string =>
    time >= 10 ? time.toString() : `0${time}`;

  const calculateTimeLeft = useCallback(() => {
    const now = moment.utc().valueOf();
    const countDownEndAt = new Date(Number(endAt) * 1000).getTime();
    const distance = countDownEndAt - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let time_left = defaultTime;
    if (distance > 0) {
      time_left = {
        days: formatTimeLessThanTen(days),
        hours: formatTimeLessThanTen(hours),
        minutes: formatTimeLessThanTen(minutes),
        seconds: formatTimeLessThanTen(seconds),
      };
      setIsDone(false);
    } else {
      if (onMomentChange) onMomentChange();
      time_left = defaultTime;
      setIsDone(true);
    }
    return time_left;
  }, [endAt, onMomentChange]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [calculateTimeLeft]);

  return { timeLeft, isDone };
}
