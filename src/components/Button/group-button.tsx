/* eslint-disable react/prop-types */
import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  ButtonGroupProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { mergeSx } from 'src/services';

export interface GroupButtonItem {
  id: string;
  content: ReactNode;
}

interface Props {
  items: Array<GroupButtonItem>;
  selectedId: string;
  events?: {
    onClick?: (item: GroupButtonItem) => void;
  };
  slideProps?: BoxProps;
  textProps?: TypographyProps;
  props?: ButtonGroupProps;
}

export default function GroupButton({
  items,
  selectedId,
  events,
  slideProps,
  textProps,
  props,
}: Props) {
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

  function onClick(item: GroupButtonItem) {
    if (events?.onClick) events.onClick(item);
  }

  return (
    <ButtonGroup
      {...props}
      sx={mergeSx([{ position: 'relative', borderRadius: '4px', overflow: 'hidden' }, props?.sx])}
    >
      <Box
        {...slideProps}
        sx={mergeSx([
          {
            left: `${left}%`,
            right: `${right}%`,
            backgroundImage: 'linear-gradient(360deg, #29A3F8 -6.94%, #21D0FB 100%)',
            position: 'absolute',
            top: 0,
            bottom: 0,
            transitionDuration: '0.25s',
          },
          slideProps?.sx,
        ])}
      />
      {items.map((item) => {
        return (
          <Button
            key={item.id}
            onClick={() => onClick(item)}
            sx={{
              border: 'none',
              verticalAlign: 'center',
              height: '100%',
              '&:hover': { border: 'none' },
            }}
          >
            <>
              {typeof item.content == 'string' ? (
                <Typography
                  {...textProps}
                  sx={mergeSx([
                    { fontSize: '15px', fontWeight: 600, color: '#22CBFB' },
                    selectedId == item.id && { color: '#ffffff' },
                    selectedId != item.id && textProps?.sx,
                  ])}
                >
                  {item.content}
                </Typography>
              ) : (
                <>{item.content}</>
              )}
            </>
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
