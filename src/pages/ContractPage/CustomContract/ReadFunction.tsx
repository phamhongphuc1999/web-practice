import { Box, Button, Collapse, Paper, TextField, Typography } from '@mui/material';
import { Fragment } from 'ethers';
import { useState } from 'react';
import ArrowAnimationIcon from 'src/components/Icons/ArrowAnimationIcon';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

interface Props {
  fragment: Array<Fragment> | undefined;
}

interface ReadItemProps {
  index: number;
  isOpen?: boolean;
  item: Fragment;
}

function ReadItem({ index, isOpen = false, item }: ReadItemProps) {
  const { t } = useLocalTranslate();
  const [open, setOpen] = useState(isOpen);

  return (
    <Box my={1}>
      <Paper onClick={() => setOpen(!open)} sx={{ cursor: 'pointer' }}>
        <Box mb={1} p="1rem" display="flex" alignItems="center" justifyContent="space-between">
          <Typography>{`${index}. ${item.type}`}</Typography>
          <ArrowAnimationIcon isTransform={open} />
        </Box>
      </Paper>
      <Collapse in={open}>
        {item.inputs.map((input, index) => {
          return (
            <Box key={index} my={1}>
              <TextField label={`${input.name}(${input.type})`} size="small" fullWidth />
            </Box>
          );
        })}
        <Button variant="contained">{t('submit')}</Button>
      </Collapse>
    </Box>
  );
}

export default function ReadFunction(param: Props) {
  const { fragment } = param;
  const { t } = useLocalTranslate();

  return (
    <Box>
      <Box mb={1} mt={1}>
        <Button variant="outlined">{t('expandAll')}</Button>
        <Button sx={{ marginLeft: '1rem' }} variant="outlined">
          {t('reset')}
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
