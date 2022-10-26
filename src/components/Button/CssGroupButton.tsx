import { Button, ButtonGroup, ButtonGroupProps, ButtonProps, styled } from '@mui/material';
import React, { useState } from 'react';

const CssButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === 'dark' ? '#263343' : '#7994C1'}`,
  backgroundColor: theme.palette.mode === 'dark' ? '#131C23' : '#E6EBF4',
  borderRadius: '6px',
  overflow: 'hidden',
}));

const CssButton = styled(Button)(() => ({
  border: 'none',
}));

const ActiveButton = styled(CssButton)(() => ({
  color: '#FFFFFF',
  backgroundColor: '#7994C1',
  '&:hover': {
    backgroundColor: '#7994C1',
  },
}));

interface Props {
  config: Array<string>;
  defaultActive?: number;
  onClick?: (event: React.MouseEvent, element: string, active: number) => void;
  activeBut?: ButtonProps;
  but?: ButtonProps;
  props?: ButtonGroupProps;
}

export default function CssGroupButton({ config, defaultActive, onClick, activeBut, but, props }: Props) {
  const [active, setActive] = useState<number>(defaultActive ?? 0);

  function onButtonClick(event: React.MouseEvent, element: string, index: number) {
    setActive(index);
    if (onClick) onClick(event, element, index);
  }

  return (
    <CssButtonGroup {...props}>
      {config.map((element, index) => {
        return active == index ? (
          <ActiveButton {...{ ...but, ...activeBut }} onClick={(event) => onButtonClick(event, element, index)}>
            {element}
          </ActiveButton>
        ) : (
          <CssButton {...but} onClick={(event) => onButtonClick(event, element, index)}>
            {element}
          </CssButton>
        );
      })}
    </CssButtonGroup>
  );
}
