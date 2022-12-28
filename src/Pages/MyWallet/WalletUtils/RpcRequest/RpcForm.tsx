import { Box, Button, Collapse, TextField, Typography } from '@mui/material';
import { ReactElement, useState } from 'react';
import ArrowAnimationIcon from 'src/components/Icons/ArrowAnimationIcon';
import useTranslate from 'src/hooks/useTranslate';
import PropertiesList, { PropertiesListProps } from './PropertiesList';

interface Props {
  requestName: string;
  listProps?: PropertiesListProps;
  placeholder?: string;
  isSubmitDisable?: boolean;
  events: {
    onChange?: (value: string) => void;
    onSubmitClick: () => void;
    onDeleteClick: () => void;
  };
  result?: string;
  Components?: {
    ResultComponent?: ReactElement;
  };
}

export default function RpcForm(props: Props) {
  const { requestName, listProps, placeholder, isSubmitDisable, events, result, Components } = props;
  const { t } = useTranslate();
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ borderTop: '1px solid', pt: 1, mt: 1 }}>
      <Box display="flex" justifyContent="space-between" sx={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
        <Typography variant="h4">{requestName}</Typography>
        <ArrowAnimationIcon isTransform={open} />
      </Box>
      <Collapse in={open}>
        <PropertiesList {...listProps} />
        {events.onChange && (
          <TextField
            fullWidth
            placeholder={placeholder}
            onChange={(e) => {
              if (events.onChange) events.onChange(e.currentTarget.value);
            }}
          />
        )}
        <Box display="flex" alignItems="center">
          <Button
            sx={{ mt: 1, mr: 1 }}
            disabled={isSubmitDisable}
            variant="outlined"
            onClick={() => events.onSubmitClick()}
          >
            {t('submit')}
          </Button>
          <Button sx={{ mt: 1, mr: 1 }} variant="contained" color="error" onClick={() => events.onDeleteClick()}>
            {t('delete')}
          </Button>
          {result && result.length > 0 && <Typography>{`${t('result')}: ${result}`}</Typography>}
        </Box>
        {Components?.ResultComponent}
      </Collapse>
    </Box>
  );
}
