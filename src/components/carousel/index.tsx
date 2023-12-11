import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, BoxProps, IconButton } from '@mui/material';
import { ReactNode, useEffect } from 'react';

const defaultInterval = 2000;

interface Props {
  location: number;
  setLocation: (location: number) => void;
  items: Array<ReactNode>;
  metadata?: {
    isArrow?: boolean;
    interval?: number;
  };
  props?: BoxProps;
}

export default function Carousel({ location, setLocation, items, metadata, props }: Props) {
  const isArrow = metadata?.isArrow == undefined ? true : metadata.isArrow;
  const interval =
    metadata?.interval == undefined
      ? 0
      : metadata.interval < defaultInterval
      ? defaultInterval
      : metadata.interval;
  const len = items.length;

  function onBackClick() {
    setLocation(location == 0 ? len - 1 : location - 1);
  }

  function onNextClick() {
    setLocation(location == len - 1 ? 0 : location + 1);
  }

  useEffect(() => {
    let fn: NodeJS.Timeout | undefined = undefined;
    if (interval >= defaultInterval) {
      fn = setInterval(() => {
        onNextClick();
      }, defaultInterval);
    }
    if (fn || interval < defaultInterval) return () => clearInterval(fn);
  }, [location, interval]);

  return (
    <Box {...props}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {isArrow && (
          <IconButton onClick={onBackClick}>
            <ArrowBackIcon />
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
              {items.map((item, index) => {
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
            <ArrowForwardIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
