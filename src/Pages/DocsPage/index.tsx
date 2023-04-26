import { Box, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { DOCS_ROUTE } from 'src/configs/constance';

export default function DocsPage() {
  const history = useHistory();

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Button variant="outlined" onClick={() => history.push(DOCS_ROUTE.GAS_PRICE)}>
        Gas and fees
      </Button>
    </Box>
  );
}
