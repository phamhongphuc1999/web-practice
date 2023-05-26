import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import SlideGroupButton from 'src/components/Button/SlideGroupButton';
import ThemeButton from 'src/components/Button/ThemeButton';
import { TextCopy } from 'src/components/Icons/CopyIcon';
import LanguageSelector from 'src/components/Selector/LanguageSelector';
import PasswordTextField from 'src/components/TextField/PasswordTextField';
import useTranslate from 'src/hooks/useTranslate';
import { useAppSelector } from 'src/redux/hook';

export default function UtilElement() {
  const history = useHistory();
  const { t } = useTranslate();
  const { theme } = useAppSelector((state) => state.userConfigSlice);
  const [text, setText] = useState('1');

  return (
    <>
      <CssBreadcrumbs configs={[{ label: t('utils') }]} props={{ mb: 2 }} />
      <Box display="flex" flexWrap="wrap">
        <Button variant="contained" color="primary" onClick={() => history.push('/utils/date-picker')}>
          {t('rangeDatePicker')}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => history.push('/utils/selector')}
          sx={{ marginLeft: '0.5rem' }}
        >
          {t('multipleSelector')}
        </Button>
        <TextCopy rootProps={{ ml: 1 }} title={t('copyHere')} iconProps={{ copyText: t('copyHere') }} />
        <Box ml={1} display="flex" alignItems="center">
          <Typography>{t(theme.label)}</Typography>
          <ThemeButton />
        </Box>
      </Box>
      <Box mt={2} display="flex" flexWrap="wrap">
        <LanguageSelector />
        <PasswordTextField props={{ sx: { ml: 2, width: '40%' }, placeholder: t('enterPassword') }} />
      </Box>
      <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>{text}</Typography>
        <SlideGroupButton
          defaultActive={0}
          props={{
            sx: {
              transform: 'skewX(-20deg)',
              borderRadius: '4px',
              boxShadow: '2px 3px 0px #1841B5',
              minWidth: '170px',
              ml: 1,
            },
          }}
          textProps={{ sx: { transform: 'skewX(20deg)', fontSize: '15px', fontWeight: 600, color: '#22CBFB' } }}
          textActiveProps={{ sx: { color: '#FFFFFF' } }}
          items={[
            { name: '1', onClick: () => setText('1') },
            { name: '2', onClick: () => setText('2') },
            { name: '3', onClick: () => setText('3') },
            { name: '4', onClick: () => setText('4') },
            { name: '5', onClick: () => setText('5') },
            { name: '6', onClick: () => setText('6') },
            { name: '7', onClick: () => setText('7') },
          ]}
        />
      </Box>
    </>
  );
}
