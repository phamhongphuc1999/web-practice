import { Howl } from 'howler';
import { useEffect, useState } from 'react';
import { Button } from 'src/components/shadcn-ui/button';

const sound = new Howl({ src: ['/sounds/countdown.mp3'], volume: 1, loop: false, preload: true });

export default function SoundComponent() {
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let _timer: NodeJS.Timeout | undefined = undefined;
    if (!visible) {
      _timer = setInterval(() => {
        setCountdown((preValue) => {
          if (preValue == 1) return 5;
          return preValue - 1;
        });
      }, 1000);
    } else {
      setCountdown(5);
    }
    return () => clearInterval(_timer);
  }, [visible]);

  useEffect(() => {
    if (countdown == 5 && !visible) {
      sound.play();
    } else if (visible) {
      sound.stop();
    }
  }, [countdown, visible]);

  useEffect(() => {
    let _timeout: NodeJS.Timeout | undefined = undefined;
    if (visible) {
      _timeout = setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
    return () => clearTimeout(_timeout);
  }, [visible]);

  return (
    <div>
      <p>
        is playing: {sound.playing().toString()} {countdown}
      </p>
      <Button onClick={() => setVisible((preValue) => !preValue)}>{visible.toString()}</Button>
    </div>
  );
}
