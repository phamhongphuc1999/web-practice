import ClearIcon from '@mui/icons-material/Clear';
import { Box, BoxProps, List, ListItem, Popover, styled, Typography } from '@mui/material';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
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

interface MultipleSelectorItem {
  id: string;
  label: string;
}

interface ItemProps<T> {
  item: T;
}

interface Props<T> extends BoxProps {
  items: Array<T>;
  defaultSelectedItems?: Array<T>;
  events?: {
    onSelectItem?: (
      e: React.MouseEvent<HTMLLIElement, MouseEvent>,
      item: T,
      items: Array<T>
    ) => void;
    onRemoveItem?: (
      e: React.MouseEvent<SVGSVGElement, MouseEvent>,
      item: T,
      items: Array<T>
    ) => void;
  };
  Component?: {
    start?: ReactNode;
    end?: ReactNode;
  };
  config?: {
    maxItem?: number;
  };
}

export default function MultipleSelector<T extends MultipleSelectorItem>(params: Props<T>) {
  const { items, defaultSelectedItems, events, Component, config, ...props } = params;
  const rootRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined);
  const open = Boolean(anchorEl);
  const id = open ? 'multiple-selector-popover' : undefined;
  const [selectedItems, setSelectedItems] = useState(defaultSelectedItems ?? []);

  useEffect(() => {
    if (selectedItems.length == 0) setSelectedItems(defaultSelectedItems ?? []);
  }, [defaultSelectedItems, selectedItems.length]);

  const rootWidth = useMemo(() => {
    if (rootRef?.current) return rootRef.current.offsetWidth;
    else return 'auto';
  }, []);

  const selectedLabel = selectedItems.map((item) => item.label);

  function onSelectItem(e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: T) {
    if (config?.maxItem) {
      if (selectedItems.length >= config.maxItem) {
        setAnchorEl(undefined);
        return toast.warn(`Selected items is less than ${config.maxItem} items`);
      }
    }
    const _temp = [...selectedItems];
    _temp.push(item);
    setSelectedItems(_temp);
    if (events?.onSelectItem) events.onSelectItem(e, item, _temp);
    setAnchorEl(undefined);
  }

  function onRemoveItem(e: React.MouseEvent<SVGSVGElement, MouseEvent>, item: T) {
    e.stopPropagation();
    const _temp = [...selectedItems];
    const index = _temp.indexOf(item);
    if (index > -1) _temp.splice(index, 1);
    setSelectedItems(_temp);
    if (events?.onRemoveItem) events.onRemoveItem(e, item, _temp);
  }

  function Item({ item }: ItemProps<T>) {
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
          <ArrowAnimationIcon fontSize="small" isTransform={open} />
        </Box>
      </CssBox>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(undefined)}>
        {Component?.start}
        <List sx={{ width: rootWidth, paddingX: '1rem' }}>
          {items
            .filter((item) => !selectedLabel.includes(item.label))
            .map((item) => {
              return (
                <ListItem
                  key={item.id}
                  onClick={(e) => onSelectItem(e, item)}
                  sx={{ borderRadius: '6px' }}
                >
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
