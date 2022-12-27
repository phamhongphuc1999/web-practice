import { Box, Button, TextField, Typography } from '@mui/material';
import { ReactElement } from 'react';
import useTranslate from 'src/hooks/useTranslate';
import PropertiesList, { PropertiesListProps } from './PropertiesList';

interface Props {
  requestName: string;
  listProps: PropertiesListProps;
  placeholder?: string;
  events: {
    onChange: (value: string) => void;
    onSubmitClick: () => void;
    onDeleteClick: () => void;
  };
  result?: string;
  Components?: {
    ResultComponent?: ReactElement;
  };
}

export default function RpcForm(props: Props) {
  const { requestName, listProps, placeholder, events, result, Components } = props;
  const { t } = useTranslate();

  return (
    <Box sx={{ borderTop: '1px solid', pt: 1, mt: 1 }}>
      <Typography variant="h4">{requestName}</Typography>
      <PropertiesList {...listProps} />
      <TextField fullWidth placeholder={placeholder} onChange={(e) => events.onChange(e.currentTarget.value)} />
      <Box display="flex" alignItems="center">
        <Button sx={{ mt: 1, mr: 1 }} variant="outlined" onClick={() => events.onSubmitClick()}>
          {t('submit')}
        </Button>
        <Button sx={{ mt: 1, mr: 1 }} variant="contained" color="error" onClick={() => events.onDeleteClick()}>
          {t('delete')}
        </Button>
        {result && result.length > 0 && <Typography>{`${t('result')}: ${result}`}</Typography>}
      </Box>
      {Components?.ResultComponent}
    </Box>
  );
}
