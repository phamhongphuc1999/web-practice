import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import { createApi } from 'src/services/apis';

export default function ConfigPage() {
  const nlpClient = createApi('http://0.0.0.0:3000');
  const [article, setArticle] = useState('');
  const [summary, setSummary] = useState('');

  async function onSummaryClick() {
    const res = await nlpClient.post<{ story: string }>('/summary', { story: article });
    setSummary(res.story);
  }

  return (
    <>
      <CssBreadcrumbs configs={[{ label: 'config' }]} props={{ mb: 2 }} />
      <Box mt={1}>
        <Typography>Article</Typography>
        <TextField
          fullWidth
          placeholder="enter your article"
          multiline
          rows={10}
          maxRows={30}
          onChange={(e) => setArticle(e.target.value)}
        />
        <Button variant="contained" color="primary" disabled={article.length == 0} onClick={() => onSummaryClick()}>
          Make summary
        </Button>
      </Box>
      <Box mt={1}>
        <Typography>Summary</Typography>
        <TextField fullWidth multiline rows={5} maxRows={10} value={summary} />
      </Box>
    </>
  );
}
