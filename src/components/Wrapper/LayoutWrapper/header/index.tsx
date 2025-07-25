import { CloseOutlined, MenuOutlined, Settings } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import { useState } from 'react';
import ThemeButton from 'src/components/Button/ThemeButton';
import LanguageSelector from 'src/components/Selector/LanguageSelector';
import { CssNavLink } from 'src/components/utils';
import { AppReferenceConfig, ROUTE } from 'src/configs/layout';
import { AppReferenceId } from 'src/global';
import HeaderDetailItem from './HeaderDetailItem';
import HeaderText from './HeaderText';
import SmallPopover from './SmallPopover';

export default function Header() {
  const [referenceId, setReferenceId] = useState<AppReferenceId>('academy');
  const [smallEl, setSmallEl] = useState<SVGSVGElement | null>(null);
  const smallOpen = Boolean(smallEl);

  function onSmallPopoverClose() {
    setSmallEl(null);
    setReferenceId('academy');
  }

  return (
    <div>
      <Container
        maxWidth="md"
        className="bg-grey-50 fixed top-[1rem] left-[50%] z-[1205] h-[65px] translate-x-[-50%] rounded-[999px]"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          {!location.pathname.includes(ROUTE.CONFIG) && (
            <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <ThemeButton />
            </Box>
          )}
          <div className="main-header-reference">
            {Object.values(AppReferenceConfig).map((item) => {
              if (item.items)
                return (
                  <Box
                    key={item.id}
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
                      className="header-box-item absolute top-[68px] left-[50%] w-[340px] translate-x-[-50%] pt-[1rem]"
                    />
                  </Box>
                );
              else
                return (
                  <CssNavLink key={item.id} to={item.link ?? ''}>
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
      </Container>
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
