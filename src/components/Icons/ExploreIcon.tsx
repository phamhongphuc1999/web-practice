import useExplorerUrl, { ConfigType } from 'src/hooks/useExplorerUrl';
import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton, IconButtonProps, SvgIconProps, Tooltip } from '@mui/material';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

interface Props extends IconButtonProps {
  hash: string;
  config: ConfigType;
  iconProps?: SvgIconProps;
}

export default function ExploreIcon({ hash, config, iconProps, ...props }: Props) {
  const { t } = useLocalTranslate();
  const { link, text } = useExplorerUrl(hash, config);

  return (
    <Tooltip title={t('openOn', { location: text })}>
      <IconButton {...props} onClick={() => window.open(link, '_blank')}>
        <LaunchIcon {...iconProps} fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
