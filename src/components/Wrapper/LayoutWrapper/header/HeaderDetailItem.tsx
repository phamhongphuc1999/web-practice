import { Box, BoxProps, useTheme } from '@mui/material';
import { CssNavLink } from 'src/components/utils';
import { AppReferenceItemType } from 'src/global';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { mergeSx } from 'src/services';

interface MainHeaderBoxPRops {
  index: number;
  item: AppReferenceItemType;
  dataProps?: BoxProps;
}

function MainHeaderBox({ index, item, dataProps }: MainHeaderBoxPRops) {
  const Icon = item.icon;
  const { t } = useLocalTranslate();
  const theme = useTheme();

  return (
    <Box
      {...dataProps}
      sx={mergeSx(
        {
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          mt: index == 0 ? '0rem' : '1rem',
          borderRadius: '16px',
          padding: '8px',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: theme.palette.mode == 'light' ? '#F8F9FB' : 'rgba(63, 63, 63, 0.56)',
          },
        },
        dataProps?.sx
      )}
    >
      <div className="flex items-center justify-center rounded-[8px] border-[1px] border-[#e5e7eb] px-[8px] py-[8px]">
        <Icon style={{ width: '30px', height: '30px' }} />
      </div>
      <Box>
        <p className="text-[14px] leading-[18px] font-[500]">{t(item.title)}</p>
        <p className="text-[12px] leading-[18px]">{t(item.description)}</p>
      </Box>
    </Box>
  );
}

interface HeaderBoxProps extends BoxProps {
  config: Array<AppReferenceItemType>;
  onLinkClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}

export function HeaderBox({ config, onLinkClick, ...props }: HeaderBoxProps) {
  return (
    <Box {...props}>
      {config.map((item, index) => {
        return (
          <CssNavLink key={item.title} to={item.link} onClick={onLinkClick}>
            <MainHeaderBox index={index} item={item} />
          </CssNavLink>
        );
      })}
    </Box>
  );
}

interface Props extends BoxProps {
  config: Array<AppReferenceItemType>;
}

export default function HeaderDetailItem({ config, ...props }: Props) {
  return (
    <Box {...props}>
      <HeaderBox
        config={config}
        sx={(theme) => ({
          background: theme.palette.background.paper,
          boxShadow:
            theme.palette.mode === 'light'
              ? 'rgb(0 0 0 / 20%) 0px 0px 2px, rgb(0 0 0 / 10%) 0px 2px 10px'
              : 'rgb(255 255 255 / 20%) 0px 0px 2px, rgb(185 185 185 / 10%) 0px 2px 10px',
          padding: '0.5rem',
          borderRadius: '24px',
        })}
      />
    </Box>
  );
}
