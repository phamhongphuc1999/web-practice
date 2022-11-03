import { Box, Button, Collapse, Paper, Typography } from '@mui/material';
import { Fragment } from 'ethers/lib/utils';
import { useState } from 'react';
import ArrowAnimationIcon from 'src/components/Icons/ArrowAnimationIcon';

interface Props {
  fragment: Array<Fragment> | undefined;
}

interface ReadItemProps {
  index: number;
  item: Fragment;
}

function ReadItem({ index, item }: ReadItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Paper onClick={() => setOpen(!open)} sx={{ cursor: 'pointer' }}>
        <Box mb={1} p="1rem" display="flex" alignItems="center" justifyContent="space-between">
          <Typography>{`${index}. ${item.name}`}</Typography>
          <ArrowAnimationIcon isTransform={open} />
        </Box>
      </Paper>
      <Collapse in={open}>123</Collapse>
    </>
  );
}

export default function WriteFunction(param: Props) {
  const { fragment } = param;

  return (
    <Box>
      <Box mb={1}>
        <Button variant="outlined">Expand all</Button>
        <Button sx={{ marginLeft: '1rem' }} variant="outlined">
          Reset
        </Button>
      </Box>
      {fragment && (
        <>
          {fragment.map((item, index) => (
            <ReadItem key={index} index={index + 1} item={item} />
          ))}
        </>
      )}
    </Box>
  );
}
