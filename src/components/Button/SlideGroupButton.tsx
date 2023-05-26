/* eslint-disable react/prop-types */
import { Box, BoxProps, SxProps, Theme, Typography, TypographyProps } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { useMemo, useState } from 'react';

const root = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '2px solid #22CBFB',
  height: '40px',
  cursor: 'pointer',
};

export interface SlideItem {
  name: string;
  onClick?: (value: number) => void;
}

interface Props {
  items: Array<SlideItem>;
  defaultActive?: number;
  textProps?: TypographyProps;
  textActiveProps?: TypographyProps;
  props?: BoxProps;
}

export default function SlideGroupButton({ items, defaultActive = 0, textProps, textActiveProps, props }: Props) {
  const [active, setActive] = useState(defaultActive);

  const { left, right } = useMemo(() => {
    const baseUnit = 100 / items.length;
    const left = baseUnit * active;
    const right = 100 - baseUnit - left;
    return { left, right };
  }, [active, items.length]);

  return (
    <Box {...props} sx={[root, props?.sx] as SxProps<Theme>}>
      <Box
        sx={{
          position: 'absolute',
          backgroundImage: 'linear-gradient(360deg, #29A3F8 -6.94%, #21D0FB 100%)',
          top: 0,
          bottom: 0,
          left: `${left}%`,
          right: `${right}%`,
          transitionDuration: '0.25s',
        }}
      />
      {items.map((item, index) => {
        const textRealProp = active == index ? deepmerge(textProps, textActiveProps) : { ...textProps };

        return (
          <Box
            key={index}
            sx={{ px: '1rem', flex: 1, display: 'flex', justifyContent: 'center' }}
            onClick={() => {
              if (item.onClick) item.onClick(index);
              setActive(index);
            }}
          >
            <Typography {...textRealProp}>{item.name}</Typography>
          </Box>
        );
      })}
    </Box>
  );
}
