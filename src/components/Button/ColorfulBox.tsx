import { DivProps, styleMerge } from '@peter-present/led-caro';
import { cn } from 'src/lib/utils';

interface Props extends DivProps {
  color?: 'purple' | 'gray' | 'blue';
}

export default function ColorfulBox({ color = 'purple', ...props }: Props) {
  return (
    <div
      {...styleMerge(
        { className: 'relative isolate inline-block cursor-pointer overflow-hidden' },
        props
      )}
    >
      <div className="glowing-box-animations">
        <div
          className={cn(
            'glowing-box-glow',
            color == 'purple'
              ? 'glowing-box-purple-bg'
              : color == 'blue'
                ? 'glowing-box-blue-bg'
                : 'glowing-box-white-bg'
          )}
        />
        <div className="glowing-box-stars-masker">
          <div
            className={cn(
              'glowing-box-stars',
              color == 'purple'
                ? 'glowing-box-purple-bg'
                : color == 'blue'
                  ? 'glowing-box-button-blue-bg'
                  : 'glowing-box-white-bg'
            )}
          />
        </div>
      </div>
      <div className="glowing-box-borders-masker">
        <div
          className={cn(
            'glowing-box-borders',
            color == 'purple'
              ? 'glowing-box-purple-bg'
              : color == 'blue'
                ? 'glowing-box-blue-bg'
                : 'glowing-box-white-bg'
          )}
        />
      </div>
      <div
        className={cn(
          'glowing-box-button text-white',
          color == 'purple'
            ? 'glowing-box-button-purple-bg'
            : color == 'blue'
              ? 'glowing-box-button-blue-bg'
              : 'glowing-box-button-white-bg'
        )}
      >
        {props.children}
      </div>
    </div>
  );
}
