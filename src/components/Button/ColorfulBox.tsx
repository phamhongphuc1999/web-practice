import { CSSProperties } from 'react';
import { ButtonColorfulType, DivProps } from 'src/global';
import { cn } from 'src/lib/utils';

const ColorConfig: { [key1 in ButtonColorfulType]: { r: number; g: number; b: number } } = {
  purple: { r: 199, g: 120, b: 221 },
  gray: { r: 255, g: 255, b: 255 },
  orange: { r: 173, g: 102, b: 54 },
};

export type ColorfulBoxRgbType = { r?: number; g?: number; b?: number };

interface Props extends DivProps {
  color?: ButtonColorfulType;
  rgb?: ColorfulBoxRgbType;
}

export default function ColorfulBox({ color = 'purple', rgb, ...props }: Props) {
  const _color = {
    '--r': rgb?.r || ColorConfig[color].r,
    '--g': rgb?.g || ColorConfig[color].g,
    '--b': rgb?.b || ColorConfig[color].b,
  } as CSSProperties;

  return (
    <div
      {...props}
      className={cn(
        'relative isolate inline-block cursor-pointer overflow-hidden',
        props.className
      )}
    >
      <div className="glowing-box-animations">
        <div className="glowing-box-glow glowing-box-base-color-bg" style={_color} />
        <div className="glowing-box-stars-masker">
          <div className="glowing-box-stars glowing-box-base-color-bg" style={_color} />
        </div>
      </div>
      <div className="glowing-box-borders-masker">
        <div className="glowing-box-borders glowing-box-base-color-bg" style={_color} />
      </div>
      <div
        className="glowing-box-button glowing-box-button-base-color-bg text-white"
        style={_color}
      >
        {props.children}
      </div>
    </div>
  );
}
