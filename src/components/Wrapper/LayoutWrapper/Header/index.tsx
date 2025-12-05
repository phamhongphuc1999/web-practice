import { CloseOutlined, MenuOutlined, Settings } from '@mui/icons-material';
import { useState } from 'react';
import { Menu, MenuItem } from 'src/components/aceternity/navbar-menu';
import ThemeButton from 'src/components/Button/ThemeButton';
import LanguageSelector from 'src/components/Selector/LanguageSelector';
import { CssNavLink } from 'src/components/utils';
import { AppReferenceConfig, ROUTE } from 'src/configs/layout';
import { AppReferenceId } from 'src/global';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import SmallPopover from './SmallPopover';

export default function Header() {
  const { t } = useLocalTranslate();
  const [active, setActive] = useState<string | null>(null);
  const [smallEl, setSmallEl] = useState<SVGSVGElement | null>(null);
  const smallOpen = Boolean(smallEl);
  const [referenceId, setReferenceId] = useState<AppReferenceId>('academy');

  function onSmallPopoverClose() {
    setSmallEl(null);
    setReferenceId('academy');
  }

  return (
    <>
      <div className="fixed inset-x-0 top-10 z-50 mx-auto max-w-2xl">
        <Menu setActive={setActive} className="flex items-center justify-between">
          {!location.pathname.includes(ROUTE.CONFIG) && (
            <div className="relative flex items-center">
              <ThemeButton />
            </div>
          )}
          {Object.values(AppReferenceConfig).map((item) => {
            return (
              <MenuItem
                key={item.id}
                setActive={setActive}
                active={active}
                item={t(item.title)}
                className="main-header-reference"
              >
                <div className="flex flex-col space-y-4 text-sm">
                  {(item.items || []).map((subItem) => {
                    const Icon = subItem.icon;

                    return (
                      <a href={subItem.link}>
                        <div className="rounded-4 hover:bg-popover mb-4 flex cursor-pointer items-center gap-2 p-2">
                          <div className="flex items-center justify-center rounded-xl border border-[#e5e7eb] px-2 py-2">
                            <Icon style={{ width: '30px', height: '30px' }} />
                          </div>
                          <div>
                            <p className="text-[14px] leading-[18px] font-medium">
                              {t(subItem.title)}
                            </p>
                            <p className="text-[12px] leading-[18px]">{t(subItem.description)}</p>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </MenuItem>
            );
          })}
          <div className="flex items-center gap-4">
            {!location.pathname.includes(ROUTE.CONFIG) && (
              <>
                <LanguageSelector />
                <CssNavLink to={ROUTE.CONFIG}>
                  <Settings />
                </CssNavLink>
              </>
            )}
            <div className="header-close-icon ml-2 h-[35px] w-[35px] items-center justify-center rounded-[50%]">
              {smallOpen ? (
                <CloseOutlined className="h-4 w-4" onClick={onSmallPopoverClose} />
              ) : (
                <MenuOutlined
                  className="h-4 w-4"
                  onClick={(event) => setSmallEl(event.currentTarget)}
                />
              )}
            </div>
          </div>
        </Menu>
      </div>
      <SmallPopover
        id="small-header-popover"
        anchorEl={smallEl}
        open={smallOpen}
        onClose={onSmallPopoverClose}
        setEl={setSmallEl}
        referenceId={referenceId}
        setReferenceId={setReferenceId}
      />
    </>
  );
}
