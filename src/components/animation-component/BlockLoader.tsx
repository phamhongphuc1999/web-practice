import { Box, keyframes, styled } from '@mui/material';
import { AnimationComponentDivProps, AnimationComponentProps } from 'src/global';
import { cn } from 'src/lib/utils';

const block = keyframes`
  0% {transform: rotate(0deg) scale(1); animation-timing-function: ease-in;}
  10% {transform: rotate(0deg) scale(0);}
  50% {transform: rotate(90deg) scale(0); animation-timing-function: ease-out;}
  60% {transform: rotate(180deg) scale(1);}
  100% {transform: rotate(180deg) scale(1);}
`;

const Block = styled('div')`
  position: absolute;
  box-sizing: border-box;
  width: 33.333333%;
  height: 33.333333%;
`;

export default function BlockLoader({
  size = 80,
  color = 'var(--primary-main)',
}: AnimationComponentProps) {
  const baseSize = 0.33333333 * Number(size);
  const _sx = {
    backgroundColor: color,
    animation: `${block} 2s linear infinite normal none running`,
  };

  return (
    <Box sx={{ display: 'inline-block', width: size, height: size, perspective: 800 }}>
      <Block sx={[_sx, { top: -baseSize, left: -baseSize, animationDelay: '-1.75s' }]} />
      <Block sx={[_sx, { top: -baseSize, left: 0, animationDelay: '-1.5s' }]} />
      <Block sx={[_sx, { top: -baseSize, left: baseSize, animationDelay: '-1.25s' }]} />
      <Block sx={[_sx, { top: 0, left: baseSize, animationDelay: '-1s' }]} />
      <Block sx={[_sx, { top: baseSize, left: baseSize, animationDelay: '-0.75s' }]} />
      <Block sx={[_sx, { top: baseSize, left: 0, animationDelay: '-0.5s' }]} />
      <Block sx={[_sx, { top: baseSize, left: -baseSize, animationDelay: '-0.25s' }]} />
      <Block sx={[_sx, { top: 0, left: -baseSize, animationDelay: '0s' }]} />
    </Box>
  );
}

export function BlockLoaderBox({ iconProps, ...props }: AnimationComponentDivProps) {
  return (
    <Box {...props} className={cn('flex justify-center', props.className)}>
      <BlockLoader {...iconProps} />
    </Box>
  );
}
