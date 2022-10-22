import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { SvgIconProps } from '@mui/material';

interface Props {
  isTransform: boolean;
  props: SvgIconProps;
}

export default function ArrowAnimationIcon({ isTransform, props }: Props) {
  return (
    <ArrowBackIosIcon
      {...props}
      sx={[
        isTransform && { transform: 'rotate(90deg)', transition: '0.5s' },
        !isTransform && { transform: 'rotate(-90deg)', transition: '0.5s' },
      ]}
    />
  );
}
