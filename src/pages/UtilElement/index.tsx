import { Box, Button, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ColorfulBox from 'src/components/Button/ColorfulBox';
import GradientTabs from 'src/components/Button/GradientTabs';
import ThemeButton from 'src/components/Button/ThemeButton';
import GroupButton from 'src/components/Button/group-button';
import { AnalyticIcon, ScoreIcon } from 'src/components/Icons';
import { TextCopy } from 'src/components/Icons/CopyIcon';
import ReactSeo from 'src/components/ReactSeo';
import LanguageSelector from 'src/components/Selector/LanguageSelector';
import PasswordTextField from 'src/components/TextField/PasswordTextField';
import ScrollPaper from 'src/components/paper/scroll-paper';
import { ROUTE } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { useAppSelector } from 'src/redux/store';

export default function UtilElement() {
  const navigate = useNavigate();
  const { t } = useLocalTranslate();
  const { themeLabel } = useAppSelector((state) => state.config);
  const [selectedId, setSelectedId] = useState('1');
  const [countdown, setCountdown] = useState(0);
  const [activeTab, setActiveTab] = useState('score');
  const _id = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    _id.current = setInterval(() => {
      setCountdown((prev) => prev + 0.3);
    }, 1000);

    return () => {
      if (_id.current) clearInterval(_id.current);
    };
  }, [countdown]);

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
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(ROUTE.UTIL_CAROUSEL)}
          sx={{ marginLeft: '0.5rem' }}
        >
          {t('datePicker.title')}
        </Button>
        <ColorfulBox className="ml-2" onClick={() => navigate(ROUTE.UTIL_COLORFUL_BOX)}>
          {t('colorfulBox.title')}
        </ColorfulBox>
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
      <Box mt={2}>
        <ScrollPaper border="1px solid red" borderRadius="8px" padding={1} height="200px">
          {Array(100)
            .fill(0)
            .map((_, index) => (
              <Typography key={index}>{`line${index + 1}`}</Typography>
            ))}
        </ScrollPaper>
      </Box>
      <GroupButton
        className="mt-[1rem]"
        options={[
          { id: '1', content: 'item1', width: 60 },
          { id: '2', content: 'item2', width: 65 },
          { id: '3', content: 'item3', width: 70 },
          { id: '4', content: 'item4', width: 75 },
          { id: '5', content: 'item5', width: 80 },
          { id: '6', content: 'item6', width: 85 },
          { id: '7', content: 'item7', width: 90 },
        ]}
        selectedId={selectedId}
        events={{ onOptionChange: (id) => setSelectedId(id) }}
      />
      <div className="bg-[#111113]">
        <GradientTabs
          className="mt-2"
          events={{ onClick: (tab) => setActiveTab(tab) }}
          tabs={[
            {
              id: 'score',
              children: (
                <div className="flex flex-col items-center gap-1">
                  Score
                  <ScoreIcon />
                </div>
              ),
            },
            {
              id: 'analytic',
              children: (
                <div className="flex flex-col items-center gap-1">
                  Analytic
                  <AnalyticIcon />
                </div>
              ),
            },
          ]}
          activeTabs={activeTab}
        />
      </div>
    </>
  );
}
