import ClearIcon from '@mui/icons-material/Clear';
import { Box, BoxProps, List, ListItem, Popover, styled, Typography } from '@mui/material';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import useNotify from 'src/hooks/useNotify';
import ArrowAnimationIcon from '../Icons/ArrowAnimationIcon';

const CssBox = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? '#233345' : '#F4F6FA',
  border: `1px solid ${theme.palette.mode === 'dark' ? '#334965' : '#E6E6E6'}`,
  borderRadius: '10px',
  padding: '0.25rem 0.25rem',
  cursor: 'pointer',
  minHeight: '44px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const ItemBox = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? '#031527' : '#FFFFFF',
  borderRadius: '6px',
  padding: '0.25rem 0.25rem 0.25rem 0.25rem',
  margin: '0.175rem 0rem 0.175rem 0.25rem',
}));

interface Item {
  id: string;
  label: string;
}

interface ItemProps {
  item: Item;
}

interface Props {
  items: Array<Item>;
  defaultSelectedItems?: Array<Item>;
  events?: {
    onSelectItem?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: Item, items: Array<Item>) => void;
    onRemoveItem?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>, item: Item, items: Array<Item>) => void;
  };
  Component?: {
    start?: ReactNode;
    end?: ReactNode;
  };
  config?: {
    maxItem?: number;
  };
  props?: BoxProps;
}

export default function MultipleSelector(params: Props) {
  const { items, defaultSelectedItems, events, Component, config, props } = params;
  const rootRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined);
  const open = Boolean(anchorEl);
  const id = open ? 'multiple-selector-popover' : undefined;
  const [selectedItems, setSelectedItems] = useState(defaultSelectedItems ?? []);
  const { warnNotify } = useNotify();

  useEffect(() => {
    if (selectedItems.length == 0) setSelectedItems(defaultSelectedItems ?? []);
  }, [defaultSelectedItems]);

  const rootWidth = useMemo(() => {
    if (rootRef?.current) return rootRef.current.offsetWidth;
    else return 'auto';
  }, [rootRef?.current]);

  const selectedLabel = selectedItems.map((item) => item.label);

  function onSelectItem(e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: Item) {
    if (config?.maxItem) {
      if (selectedItems.length >= config.maxItem) {
        setAnchorEl(undefined);
        return warnNotify(`Selected items is less than ${config.maxItem} items`);
      }
    }
    const _temp = [...selectedItems];
    _temp.push(item);
    setSelectedItems(_temp);
    if (events?.onSelectItem) events.onSelectItem(e, item, _temp);
    setAnchorEl(undefined);
  }

  function onRemoveItem(e: React.MouseEvent<SVGSVGElement, MouseEvent>, item: Item) {
    e.stopPropagation();
    const _temp = [...selectedItems];
    const index = _temp.indexOf(item);
    if (index > -1) _temp.splice(index, 1);
    setSelectedItems(_temp);
    if (events?.onRemoveItem) events.onRemoveItem(e, item, _temp);
  }

  function Item({ item }: ItemProps) {
    return (
      <ItemBox display="inline-flex" justifyContent="flex-start" alignItems="center">
        <Typography>{item.label}</Typography>
        <ClearIcon
          sx={(theme) => ({ fontSize: '14px', color: theme.palette.text.disabled })}
          onClick={(e) => onRemoveItem(e, item)}
        />
      </ItemBox>
    );
  }

  return (
    <>
      <CssBox {...props} ref={rootRef} onClick={(event) => setAnchorEl(event.currentTarget)}>
        <Box display="flex" flexWrap="wrap">
          {selectedItems.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </Box>
        <Box display="flex" alignItems="center" width="25px" px="2px">
          <ArrowAnimationIcon props={{ fontSize: 'small' }} isTransform={open} />
        </Box>
      </CssBox>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(undefined)}>
        {Component?.start}
        <List sx={{ width: rootWidth, paddingX: '1rem' }}>
          {items
            .filter((item) => !selectedLabel.includes(item.label))
            .map((item: Item) => {
              return (
                <ListItem key={item.id} button onClick={(e) => onSelectItem(e, item)} sx={{ borderRadius: '6px' }}>
                  {item.label}
                </ListItem>
              );
            })}
        </List>
        {Component?.end}
      </Popover>
    </>
  );
}
