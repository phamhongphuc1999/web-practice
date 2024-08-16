import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SvgIconProps } from '@mui/material';

interface Props extends SvgIconProps {
  isTransform: boolean;
}

export default function ArrowAnimationIcon({ isTransform, ...props }: Props) {
  return (
    <ExpandMoreIcon
      {...props}
      sx={[
        isTransform && { transform: 'rotate(180deg)', transition: '0.5s' },
        !isTransform && { transform: 'rotate(0deg)', transition: '0.5s' },
      ]}
    />
  );
}
