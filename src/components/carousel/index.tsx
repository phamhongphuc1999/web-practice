import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, BoxProps, IconButton } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  location: number;
  setLocation: (location: number) => void;
  items: Array<ReactNode>;
  props?: BoxProps;
}

export default function Carousel({ location, setLocation, items, props }: Props) {
  const len = items.length;

  return (
    <Box {...props}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton onClick={() => setLocation(location == 0 ? len - 1 : location - 1)}>
          <ArrowBackIcon />
        </IconButton>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
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
        <IconButton onClick={() => setLocation(location == len - 1 ? 0 : location + 1)}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
