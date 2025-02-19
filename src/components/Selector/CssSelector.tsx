import { Box, BoxProps, List, ListItem, Popover, styled, Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import ArrowAnimationIcon from '../Icons/ArrowAnimationIcon';

const CssBox = styled(Box)(({ theme }) => ({
  padding: '0.5rem',
  background: theme.palette.mode === 'dark' ? '#233345' : '#D8DFEB',
  border: `1px solid ${theme.palette.mode === 'dark' ? '#65789C' : '#7994C1'}`,
  borderRadius: '6px',
  cursor: 'pointer',
  boxShadow: '0px 2px 1px #0000029',
  display: 'inline-flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export interface CssSelectItem {
  id: string;
  label: string;
}

interface Props<T> extends BoxProps {
  items: Array<T>;
  defaultSelectedItem?: T;
  width?: number;
  events?: {
    onChooseItem: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: T) => void;
  };
  value?: string;
}

export default function CssSelector<T extends CssSelectItem>(param: Props<T>) {
  const { items, defaultSelectedItem, width, events, value, ...props } = param;

  const rootRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined);
  const open = Boolean(anchorEl);
  const id = open ? 'css-selector-popover' : undefined;

  const [selectedItem, setSelectedItem] = useState(defaultSelectedItem);

  useEffect(() => {
    if (!selectedItem?.label) setSelectedItem(defaultSelectedItem);
  }, [defaultSelectedItem, selectedItem?.label]);

  const rootWidth = useMemo(() => {
    if (rootRef?.current) return rootRef.current.offsetWidth;
    else return 'auto';
  }, []);

  function onItemClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: T) {
    setSelectedItem(item);
    if (events?.onChooseItem) events.onChooseItem(e, item);
    setAnchorEl(undefined);
  }

  return (
    <>
      <CssBox
        width={width ?? 'auto'}
        {...props}
        ref={rootRef}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <Typography>{value ?? defaultSelectedItem?.label}</Typography>
        <ArrowAnimationIcon isTransform={open} fontSize="small" sx={{ ml: 1 }} />
      </CssBox>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(undefined)}>
        <List sx={{ width: rootWidth }}>
          {items.map((item, _) => (
            <ListItem key={item.id} onClick={(e) => onItemClick(e, item)}>
              {item.label}
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}
