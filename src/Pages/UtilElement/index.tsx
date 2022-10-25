import { Box, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';

export default function UtilElement() {
  const history = useHistory();

  return (
    <>
      <CssBreadcrumbs configs={[{ label: 'Utils' }]} props={{ mb: 2 }} />
      <Box display="flex" flexWrap="wrap">
        <Button variant="contained" color="primary" onClick={() => history.push('/utils/date-picker')}>
          Range Date Picker
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => history.push('/utils/selector')}
          sx={{ marginLeft: '0.5rem' }}
        >
          Multiple Selector
        </Button>
      </Box>
    </>
  );
}
