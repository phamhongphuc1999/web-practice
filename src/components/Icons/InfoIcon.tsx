import { SvgIconProps, Tooltip } from '@mui/material';
import { ReactNode } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface Props {
  info: ReactNode;
  iconProps?: SvgIconProps;
}

export default function InfoIcon({ info, iconProps }: Props) {
  return (
    <Tooltip title={info}>
      <InfoOutlinedIcon {...iconProps} />
    </Tooltip>
  );
}
