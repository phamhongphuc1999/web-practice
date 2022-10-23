import { Box, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

export default function UtilElement() {
  const history = useHistory();

  return (
    <Box display="flex" flexWrap="wrap">
      <Button variant="contained" color="primary" onClick={() => history.push('/utils/date-picker')}>
        Date Picker
      </Button>
    </Box>
  );
}
