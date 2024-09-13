import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton, SvgIconProps, Tooltip } from '@mui/material';
import { ExploreConfigProps, useExplorerUrl } from '@peter-present/react-hook-utils';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import { useAppSelector } from 'src/redux/store';

interface Props {
  hash: string | undefined;
  config?: Partial<ExploreConfigProps & { isShowText: boolean }>;
  iconProps?: SvgIconProps;
}

export default function ExploreIcon({ hash, config, iconProps, ...props }: Props) {
  const { t } = useLocalTranslate();
  const { chainId: appChainId } = useAppSelector((state) => state.config);
  const realChainId = appChainId > 0 ? appChainId : config?.chainId ? config.chainId : 56;
  const { link, text } = useExplorerUrl(hash, { ...config, chainId: realChainId });

  return (
    <Tooltip title={t('openOn', { location: text })}>
      <IconButton {...props} onClick={() => window.open(link, '_blank')}>
        <LaunchIcon {...iconProps} fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
