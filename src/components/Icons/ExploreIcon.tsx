import useExplorerUrl, { ConfigType } from 'src/hooks/useExplorerUrl';
import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton, IconButtonProps, SvgIconProps, Tooltip } from '@mui/material';
import useTranslate from 'src/hooks/useTranslate';

interface Props {
  hash: string;
  config: ConfigType;
  iconProps?: SvgIconProps;
  props?: IconButtonProps;
}

export default function ExploreIcon({ hash, config, iconProps, props }: Props) {
  const { t } = useTranslate();
  const { link, text } = useExplorerUrl(hash, config);

  return (
    <Tooltip title={t('openOn', { location: text })}>
      <IconButton {...props} onClick={() => window.open(link, '_blank')}>
        <LaunchIcon {...iconProps} fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
