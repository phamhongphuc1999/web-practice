/* eslint-disable react/prop-types */
import { Box, BoxProps, keyframes } from '@mui/material';
import { useMemo } from 'react';
import BluePiece from 'src/assets/images/pieces/blue-piece.svg';
import BrightGreenPiece from 'src/assets/images/pieces/bright-green-piece.svg';
import DeepBluePiece from 'src/assets/images/pieces/deep-blue-piece.svg';
import GreenPiece from 'src/assets/images/pieces/green-piece.svg';
import PinkPiece from 'src/assets/images/pieces/pink-piece.svg';
import RedPiece from 'src/assets/images/pieces/red-piece.svg';
import YellowPiece from 'src/assets/images/pieces/yellow-piece.svg';
import { mergeSx, random } from 'src/services';

type AnimationObject = {
  top: string;
  left: string;
  transform: string;
};

function getAnimation(initialState: AnimationObject, finalState: AnimationObject) {
  return keyframes`
    0% { top: ${initialState.top}; left: ${initialState.left}; transform: ${initialState.transform}; }
    100% { top: ${finalState.top}; left: ${finalState.left}; transform: ${finalState.transform}; }
  `;
}

interface PieceProps extends BoxProps {
  image: 'blue' | 'brightGreen' | 'deepBlue' | 'green' | 'pink' | 'red' | 'yellow';
  duration: number;
  animation: {
    initial: AnimationObject;
    final: AnimationObject;
  };
}

function Piece({ image, duration, animation, ...props }: PieceProps) {
  const PieceImage = useMemo(() => {
    if (image == 'blue') return BluePiece;
    else if (image == 'brightGreen') return BrightGreenPiece;
    else if (image == 'deepBlue') return DeepBluePiece;
    else if (image == 'green') return GreenPiece;
    else if (image == 'pink') return PinkPiece;
    else if (image == 'red') return RedPiece;
    else return YellowPiece;
  }, [image]);

  return (
    <Box
      {...props}
      sx={mergeSx([
        {
          backgroundImage: `url(${PieceImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          position: 'absolute',
          boxSizing: 'border-box',
          animation: `${getAnimation(
            animation.initial,
            animation.final
          )} ${duration}s linear infinite`,
        },
        props?.sx,
      ])}
    />
  );
}

const colors: Array<PieceProps['image']> = [
  'blue',
  'pink',
  'brightGreen',
  'deepBlue',
  'green',
  'yellow',
  'red',
];

interface Props extends BoxProps {
  numberOfPieces?: number;
  metadata?: {
    durationStart?: number;
    durationRange?: number;
  };
}

export default function PieceDropAnimation({ numberOfPieces = 50, metadata, ...props }: Props) {
  const { durationStart, durationEnd } = useMemo(() => {
    let durationStart = 2;
    let durationEnd = 3.5;
    const _durationStart = metadata?.durationStart;
    const _durationRange = metadata?.durationRange;
    if (_durationStart && _durationStart > 0) durationStart = _durationStart;
    if (_durationRange && _durationRange) durationEnd = durationStart + _durationRange;
    else durationEnd = durationStart + 1.5;
    return { durationStart, durationEnd };
  }, [metadata]);

  const config = useMemo<Array<PieceProps>>(() => {
    const result: Array<PieceProps> = [];
    for (let i = 0; i < numberOfPieces; i++) {
      const size = random(3, 18);
      const left = random(3, 90);
      const leftRange = random(1, 20);
      const xRotate = random(0, 180);
      const zRotate = random(0, 180);
      const finalXRotate = random(0, 360 - xRotate);
      const finalZRotate = random(0, 360 - zRotate);
      const color = Math.floor(random(0, 7));
      const duration = random(durationStart, durationEnd);
      const delay = random(0, 10);
      result.push({
        image: colors[color],
        duration,
        animation: {
          initial: {
            top: '-10%',
            left: `${left}%`,
            transform: `rotateX(${xRotate}deg) rotateZ(${zRotate}deg)`,
          },
          final: {
            top: '110%',
            left: `${left + leftRange}%`,
            transform: `rotateX(${finalXRotate}deg) rotateZ(${finalZRotate}deg)`,
          },
        },
        width: `${size}px`,
        height: `${size}px`,
        sx: { animationDelay: `-${delay}s` },
      });
    }
    return result;
  }, [numberOfPieces, durationStart, durationEnd]);

  return (
    <Box
      {...props}
      sx={mergeSx([
        { display: 'inline-block', position: 'relative', overflow: 'hidden' },
        props?.sx,
      ])}
    >
      {config.map((item, index) => {
        return <Piece key={index} {...item} />;
      })}
    </Box>
  );
}
