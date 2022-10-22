import { Button, ButtonGroup, ButtonGroupProps, ButtonProps, Theme, useTheme } from '@mui/material';
import React, { useState } from 'react';

const useStyle = (theme: Theme) => ({
  root: {
    border: `1px solid ${theme.palette.mode === 'dark' ? '#263343' : '#7994C1'}`,
    backgroundColor: theme.palette.mode === 'dark' ? '#131C23' : '#E6EBF4',
    borderRadius: '6px',
    overflow: 'hidden',
  },
});

interface Props {
  config: Array<string>;
  defaultActive?: number;
  onClick?: (event: React.MouseEvent, element: string, active: number) => void;
  activeBut: ButtonProps;
  but: ButtonProps;
  props: ButtonGroupProps;
}

export default function CssGroupButton({ config, defaultActive, onClick, activeBut, but, props }: Props) {
  const theme = useTheme();
  const cls = useStyle(theme);
  const [active, setActive] = useState<number>(defaultActive ?? 0);

  function onButtonClick(event: React.MouseEvent, element: string, index: number) {
    if (onClick) onClick(event, element, active);
    setActive(index);
  }

  return (
    <ButtonGroup {...props} sx={[cls.root]}>
      {config.map((element, index) => {
        return active == index ? (
          <Button
            {...{ ...but, ...activeBut }}
            sx={{
              border: 'none',
              color: '#FFFFFF',
              backgroundColor: '#7994C1',
              '&:hover': {
                backgroundColor: '#7994C1',
              },
            }}
            onClick={(event) => onButtonClick(event, element, index)}
          >
            {element}
          </Button>
        ) : (
          <Button {...but} sx={{ border: 'none' }} onClick={(event) => onButtonClick(event, element, index)}>
            {element}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
