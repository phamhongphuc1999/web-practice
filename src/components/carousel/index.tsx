import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, BoxProps, IconButton } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';

const defaultInterval = 2000;

interface Props extends BoxProps {
  location: number;
  items: Array<ReactNode>;
  events?: {
    setLocation: (location: number) => void;
  };
  metadata?: {
    isArrow?: boolean;
    interval?: number;
    mode?: 'normal' | 'circle' | 'linear';
  };
}

export default function Carousel({ location, items, events, metadata, ...props }: Props) {
  const [realItems, setRealItems] = useState(items);
  const [direction, setDirection] = useState<'right' | 'left'>('right');

  const isArrow = metadata?.isArrow == undefined ? true : metadata.isArrow;
  const interval =
    metadata?.interval == undefined
      ? 0
      : metadata.interval < defaultInterval
        ? defaultInterval
        : metadata.interval;
  const mode = metadata?.mode == undefined ? 'normal' : metadata.mode;
  const len = items.length;

  function onBackClick() {
    if (events?.setLocation) {
      if (mode == 'normal') events.setLocation(location == 0 ? len - 1 : location - 1);
      else if (mode == 'linear') {
        let currentDirection = direction;
        if (location == 0 || location == len - 1) {
          currentDirection = direction == 'left' ? 'right' : 'left';
          setDirection(currentDirection);
        }
        if (currentDirection == 'right') events.setLocation(location - 1);
        else events.setLocation(location + 1);
      }
    }
  }

  function onNextClick() {
    if (events?.setLocation) {
      if (mode == 'normal') events.setLocation(location == len - 1 ? 0 : location + 1);
      else if (mode == 'linear') {
        let currentDirection = direction;
        if (location == 0 || location == len - 1) {
          currentDirection = direction == 'left' ? 'right' : 'left';
          setDirection(currentDirection);
        }
        if (currentDirection == 'right') events.setLocation(location + 1);
        else events.setLocation(location - 1);
      }
    }
  }

  useEffect(() => {
    if (mode == 'normal' || mode == 'circle') setDirection('right');
  }, [mode]);

  useEffect(() => {
    setRealItems(items);
  }, [items]);

  useEffect(() => {
    let fn: NodeJS.Timeout | undefined = undefined;
    if (interval >= defaultInterval) {
      fn = setInterval(() => {
        onNextClick();
      }, defaultInterval);
    }
    if (fn || interval < defaultInterval) return () => clearInterval(fn);
  }, [location, interval, mode]);

  return (
    <Box {...props}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {isArrow && (
          <IconButton onClick={onBackClick}>
            <ArrowBack />
          </IconButton>
        )}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: isArrow ? 'calc(100% - 80px)' : '100%',
          }}
        >
          <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <Box
              sx={{
                display: 'flex',
                transform: `translateX(-${location * 100}%)`,
                transitionDuration: '0.5s',
              }}
            >
              {realItems.map((item, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexShrink: 0,
                      width: '100%',
                      boxSizing: 'border-box',
                      transformOrigin: 'center center',
                      transform: 'scale(1)',
                      scrollSnapAlign: 'center',
                    }}
                  >
                    {item}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
        {isArrow && (
          <IconButton onClick={onNextClick}>
            <ArrowForward />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
