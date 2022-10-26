import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { SvgIconProps } from '@mui/material';

interface Props {
  isTransform: boolean;
  props?: SvgIconProps;
}

export default function ArrowAnimationIcon({ isTransform, props }: Props) {
  return (
    <ExpandLessIcon
      {...props}
      sx={[
        isTransform && { transform: 'rotate(180deg)', transition: '0.5s' },
        !isTransform && { transform: 'rotate(0deg)', transition: '0.5s' },
      ]}
    />
  );
}
