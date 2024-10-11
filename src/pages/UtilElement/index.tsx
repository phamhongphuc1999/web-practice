import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ThemeButton from 'src/components/Button/ThemeButton';
import GroupButton from 'src/components/Button/group-button';
import { TextCopy } from 'src/components/Icons/CopyIcon';
import ReactSeo from 'src/components/ReactSeo';
import LanguageSelector from 'src/components/Selector/LanguageSelector';
import PasswordTextField from 'src/components/TextField/PasswordTextField';
import ScrollPaper from 'src/components/paper/scroll-paper';
import { ROUTE } from 'src/configs/constance';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { useAppSelector } from 'src/redux/store';

export default function UtilElement() {
  const navigate = useNavigate();
  const { t } = useLocalTranslate();
  const { themeLabel } = useAppSelector((state) => state.config);
  const [text, setText] = useState('1');

  return (
    <>
      <ReactSeo title={t('utils')} />
      <CssBreadcrumbs configs={[{ label: t('utils') }]} mb={2} />
      <Box display="flex" flexWrap="wrap">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(ROUTE.UTIL_DATE_PICKER)}
        >
          {t('rangeDatePicker')}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(ROUTE.UTIL_SELECTOR)}
          sx={{ marginLeft: '0.5rem' }}
        >
          {t('multipleSelector')}
        </Button>
        <TextCopy ml={1} title={t('copyHere')} iconProps={{ copyText: t('copyHere') }} />
        <Box ml={1} display="flex" alignItems="center">
          <Typography>{t(themeLabel)}</Typography>
          <ThemeButton />
        </Box>
      </Box>
      <Box mt={2} display="flex" flexWrap="wrap">
        <LanguageSelector />
        <PasswordTextField sx={{ ml: 2, width: '40%' }} placeholder={t('enterPassword')} />
      </Box>
      <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>{text}</Typography>
        <GroupButton
          sx={{
            transform: 'skewX(-20deg)',
            borderRadius: '4px',
            boxShadow: '2px 3px 0px #1841B5',
            minWidth: '170px',
            ml: 1,
          }}
          items={[
            { id: '1', content: '1' },
            { id: '2', content: '2' },
            { id: '3', content: '3' },
            { id: '4', content: '4' },
            { id: '5', content: '5' },
            { id: '6', content: '6' },
            { id: '7', content: '7' },
            { id: '8', content: '8' },
            { id: '9', content: '9' },
            { id: '10', content: '10' },
          ]}
          selectedId={text}
          events={{ onClick: (item) => setText(item.id) }}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(ROUTE.UTIL_CAROUSEL)}
          sx={{ marginLeft: '1rem' }}
        >
          Carousel
        </Button>
      </Box>
      <Box mt={2}>
        <ScrollPaper border="1px solid red" borderRadius="8px" padding={1} height="200px">
          {Array(100)
            .fill(0)
            .map((_, index) => (
              <Typography key={index}>{`line${index + 1}`}</Typography>
            ))}
        </ScrollPaper>
      </Box>
    </>
  );
}
