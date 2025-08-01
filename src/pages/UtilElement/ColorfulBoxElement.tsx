import { useState } from 'react';
import ColorfulBox, { ColorfulBoxRgbType } from 'src/components/Button/ColorfulBox';
import { Input } from 'src/components/shadcn-ui/input';
import useLocalTranslate from 'src/hooks/useLocalTranslate';

export default function ColorfulBoxElement() {
  const { t } = useLocalTranslate();
  const [r, setR] = useState<string>('');
  const [g, setG] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [rgb, setRgb] = useState<ColorfulBoxRgbType>({});

  function onSubmit() {
    setRgb({
      r: parseInt(r, 10),
      g: parseInt(g, 10),
      b: parseInt(b, 10),
    });
  }

  return (
    <div className="min-h-screen">
      <Input placeholder="r" value={r} onChange={(e) => setR(e.target.value)} />
      <Input placeholder="g" value={g} onChange={(e) => setG(e.target.value)} />
      <Input placeholder="b" value={b} onChange={(e) => setB(e.target.value)} />
      <ColorfulBox rgb={rgb} onClick={onSubmit} className="mt-5 h-[300px] w-[40%]">
        {t('submit')}
      </ColorfulBox>
    </div>
  );
}
