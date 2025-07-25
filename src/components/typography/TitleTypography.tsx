import { DivProps } from 'src/global';
import { cn } from 'src/lib/utils';

interface Props extends DivProps {
  title: string;
  titleProps?: DivProps;
}

export default function TitleTypography({ title, titleProps, ...props }: Props) {
  return (
    <div {...props} className={cn('flex items-center gap-x-2', props.className)}>
      <div {...titleProps} className={cn('w-[70px]', titleProps?.className)}>
        <p>{title}</p>
      </div>
      {props.children}
    </div>
  );
}
