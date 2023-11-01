/* eslint-disable react/prop-types */
import { Box, Button, ButtonProps, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { mergeSx } from 'src/services/merge-sx';

function useStyle() {
  return {
    root: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '2px solid #22CBFB',
      height: '40px',
    },
    box: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      transitionDuration: '0.25s',
    },
    skew: {
      transform: 'skewX(-20deg)',
      borderRadius: '4px',
      boxShadow: '2px 3px 0px #1841B5',
    },
    item: {
      width: '100%',
      height: '100%',
      padding: '0rem 1rem',
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
    },
    text: {
      fontSize: '15px',
      fontWeight: 600,
      color: '#22CBFB',
    },
    textSkew: {
      transform: 'skewX(20deg)',
    },
    textActive: {
      color: '#FFFFFF',
    },
  };
}

interface Props {
  items: Array<{ id: string; title: string }>;
  selectedId: string;
  metadata?: {
    isSkew?: boolean;
  };
  events?: {
    onClick?: (item: { id: string; title: string }) => void;
  };
  props?: ButtonProps;
}

export default function SlideGroupButton({ items, selectedId, metadata, events, props }: Props) {
  const cls = useStyle();
  const isSkew = metadata?.isSkew == undefined ? true : metadata.isSkew;
  const [isHover, setIsHover] = useState(false);

  const active = useMemo(() => {
    let counter = 0;
    for (const item of items) {
      if (item.id == selectedId) return counter;
      counter++;
    }
    return 0;
  }, [items, selectedId]);

  const { left, right } = useMemo(() => {
    const baseUnit = 100 / items.length;
    const left = baseUnit * active;
    const right = 100 - baseUnit - left;
    return { left, right };
  }, [active, items.length]);

  function onClick(item: { id: string; title: string }) {
    if (events?.onClick) events.onClick(item);
  }

  return (
    <Box sx={{ marginLeft: '22px' }}>
      <Button
        {...props}
        sx={mergeSx([cls.root, isSkew && cls.skew, props?.sx])}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Box
          sx={[
            cls.box,
            {
              left: `${left}%`,
              right: `${right}%`,
              backgroundImage: isHover
                ? 'linear-gradient(360deg, #127DC8 -6.94%, #21D0FB 100%)'
                : 'linear-gradient(360deg, #29A3F8 -6.94%, #21D0FB 100%)',
            },
          ]}
        />
        {items.map((item, index) => {
          return (
            <Box key={index} sx={cls.item} onClick={() => onClick(item)}>
              <Typography
                sx={[cls.text, isSkew && cls.textSkew, active == index && cls.textActive]}
              >
                {item.title}
              </Typography>
            </Box>
          );
        })}
      </Button>
    </Box>
  );
}
