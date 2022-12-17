import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import useTranslate from 'src/hooks/useTranslate';
import { createApi } from 'src/services/apis';

export default function ConfigPage() {
  const nlpClient = createApi('http://0.0.0.0:3000');
  const [article, setArticle] = useState('');
  const [summary, setSummary] = useState('');
  const { t } = useTranslate();

  async function onSummaryClick() {
    const res = await nlpClient.post<{ story: string }>('/summary', { story: article });
    setSummary(res.story);
  }

  return (
    <>
      <CssBreadcrumbs configs={[{ label: t('config') }]} props={{ mb: 2 }} />
      <Box mt={1}>
        <Typography>{t('article')}</Typography>
        <TextField
          fullWidth
          placeholder={t('enterArticle')}
          multiline
          rows={10}
          maxRows={30}
          onChange={(e) => setArticle(e.target.value)}
        />
        <Button variant="contained" color="primary" disabled={article.length == 0} onClick={() => onSummaryClick()}>
          {t('makeSummary')}
        </Button>
      </Box>
      <Box mt={1}>
        <Typography>{t('summary')}</Typography>
        <TextField fullWidth multiline rows={5} maxRows={10} value={summary} />
      </Box>
    </>
  );
}
