import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { SvgIconProps, SxProps, Theme, Tooltip } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { mergeSx } from 'src/services/merge-sx';

interface Props {
  info: ReactNode;
  iconProps?: SvgIconProps;
}

export default function InfoIcon({ info, iconProps }: Props) {
  const _sx = useMemo<SxProps<Theme>>(() => {
    if (iconProps?.sx) return mergeSx([{ cursor: 'pointer' }, iconProps.sx]);
    else return { cursor: 'pointer' };
  }, [iconProps?.sx]);

  return (
    <Tooltip title={info}>
      <InfoOutlinedIcon {...iconProps} sx={_sx} />
    </Tooltip>
  );
}
