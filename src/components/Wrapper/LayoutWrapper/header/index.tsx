import { Settings } from '@mui/icons-material';
import { alpha, Box, Button } from '@mui/material';
import AptosConnectButton from 'src/components/Button/AptosConnectButton';
import ThemeButton from 'src/components/Button/ThemeButton';
import LanguageSelector from 'src/components/Selector/LanguageSelector';
import { CssNavLink } from 'src/components/utils';
import { AppReferenceConfig, ROUTE } from 'src/configs/layout';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import HeaderDetailItem from './HeaderDetailItem';
import HeaderText from './HeaderText';
import { CloseOutlined, MenuOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { AppReferenceId } from 'src/global';
import SmallPopover from './SmallPopover';

export default function Header() {
  const { t } = useLocalTranslate();
  const [referenceId, setReferenceId] = useState<AppReferenceId>('academy');
  const [smallEl, setSmallEl] = useState<SVGSVGElement | null>(null);
  const smallOpen = Boolean(smallEl);

  function onSmallPopoverClose() {
    setSmallEl(null);
    setReferenceId('academy');
  }

  return (
    <div>
      <Box
        position="fixed"
        sx={(theme) => ({
          background: theme.palette.background.paper,
          zIndex: 1205,
          width: '100%',
          height: 55,
          borderBottom: `1px solid ${alpha(theme.palette.mode === 'dark' ? '#fff' : '#000', 0.12)}`,
          padding: theme.spacing(0, 2),
        })}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <ThemeButton />
            <Button
              variant="outlined"
              sx={{ ml: 1 }}
              onClick={() => window.open('/my-wallet', '_blank')}
            >
              {t('launchWallet')}
            </Button>
            {location.pathname.includes('/aptos') && <AptosConnectButton className="ml-[8px]" />}
          </Box>
          <div className="main-header-reference">
            {Object.values(AppReferenceConfig).map((item) => {
              if (item.items)
                return (
                  <Box
                    className="header-box"
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                  >
                    <HeaderText title={item.title} />
                    <HeaderDetailItem
                      config={item.items}
                      className="header-box-item absolute left-[50%] top-[68px] w-[340px] translate-x-[-50%] pt-[1rem]"
                    />
                  </Box>
                );
              else
                return (
                  <CssNavLink to={item.link ?? ''}>
                    <HeaderText title={item.title} />
                  </CssNavLink>
                );
            })}
          </div>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!location.pathname.includes(ROUTE.CONFIG) && (
              <>
                <LanguageSelector />
                <CssNavLink to={ROUTE.CONFIG}>
                  <Settings />
                </CssNavLink>
              </>
            )}
            <Box className="header-close-icon ml-[8px] h-[35px] w-[35px] items-center justify-center rounded-[50%]">
              {smallOpen ? (
                <CloseOutlined className="h-[16px] w-[16px]" onClick={onSmallPopoverClose} />
              ) : (
                <MenuOutlined
                  className="h-[16px] w-[16px]"
                  onClick={(event) => setSmallEl(event.currentTarget)}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <SmallPopover
        id="small-header-popover"
        anchorEl={smallEl}
        open={smallOpen}
        onClose={onSmallPopoverClose}
        setEl={setSmallEl}
        referenceId={referenceId}
        setReferenceId={setReferenceId}
      />
    </div>
  );
}
