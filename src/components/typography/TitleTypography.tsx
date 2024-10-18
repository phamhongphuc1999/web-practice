import { DivProps, styleMerge } from '@peter-present/led-caro';

interface Props extends DivProps {
  title: string;
  titleProps?: DivProps;
}

export default function TitleTypography({ title, titleProps, ...props }: Props) {
  return (
    <div {...styleMerge({ className: 'flex items-center gap-x-2' }, props)}>
      <div {...styleMerge({ className: 'w-[70px]' }, titleProps)}>
        <p>{title}</p>
      </div>
      {props.children}
    </div>
  );
}
