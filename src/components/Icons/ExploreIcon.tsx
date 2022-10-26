import useExplorerUrl, { ConfigType } from 'src/hooks/useExplorerUrl';
import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton, IconButtonProps, SvgIconProps, Tooltip } from '@mui/material';

interface Props {
  hash: string;
  config: ConfigType;
  iconProps?: SvgIconProps;
  props?: IconButtonProps;
}

export default function ExploreIcon({ hash, config, iconProps, props }: Props) {
  const { link, text } = useExplorerUrl(hash, config);

  return (
    <Tooltip title={`Open on ${text}`}>
      <IconButton {...props} onClick={() => window.open(link, '_blank')}>
        <LaunchIcon {...iconProps} fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
