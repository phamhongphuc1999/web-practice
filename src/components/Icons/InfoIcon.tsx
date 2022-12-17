import { SvgIconProps, SxProps, Theme, Tooltip } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface Props {
  info: ReactNode;
  iconProps?: SvgIconProps;
}

export default function InfoIcon({ info, iconProps }: Props) {
  const _sx = useMemo<SxProps<Theme>>(() => {
    if (iconProps?.sx) return [{ cursor: 'pointer' }, iconProps.sx] as SxProps<Theme>;
    else return { cursor: 'pointer' };
  }, [iconProps?.sx]);

  return (
    <Tooltip title={info}>
      <InfoOutlinedIcon {...iconProps} sx={_sx} />
    </Tooltip>
  );
}
