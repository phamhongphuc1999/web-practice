/* eslint-disable react/prop-types */
import { Box, BoxProps } from '@mui/material';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { mergeSx } from 'src/services/merge-sx';

function useStyle() {
  return {
    root: {
      position: 'relative',
      height: '100%',
      overflowX: 'hidden',
    },
    item: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      transitionDuration: '1s',
    },
  };
}

interface Props {
  items: Array<ReactNode>;
  currentIndex: number;
  events?: {
    onCurrentIndexChange?: (currentIndex: number) => void;
  };
  itemProps?: BoxProps;
  props?: BoxProps;
}

export default function Carousel({ items, currentIndex, events, itemProps, props }: Props) {
  const cls = useStyle();
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const len = items.length;

  useEffect(() => {
    if (ref.current) setWidth(ref.current.offsetWidth);
  }, [ref]);

  useEffect(() => {
    if (events?.onCurrentIndexChange != undefined) {
      const interval = setInterval(() => {
        if (events.onCurrentIndexChange) {
          if (currentIndex == len - 1) events.onCurrentIndexChange(0);
          else events.onCurrentIndexChange(currentIndex + 1);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [len, currentIndex, events]);

  return (
    <Box {...props} sx={mergeSx([cls.root, props?.sx])} ref={ref}>
      {items.map((item, index) => {
        const xSlide = (index - currentIndex) * 100;

        return (
          <Box
            key={index}
            {...itemProps}
            sx={mergeSx([
              { width: width, transform: `translateX(${xSlide}%)` },
              cls.item,
              itemProps?.sx,
            ])}
          >
            {item}
          </Box>
        );
      })}
    </Box>
  );
}
