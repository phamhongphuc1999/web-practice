import { useMemo } from 'react';
import { ENCRYPTION_CHARS } from 'src/configs/constance';
import { EncryptionState } from 'src/global';

interface Props {
  text: string;
  state: EncryptionState;
  className?: string;
}

export default function ScrambleText({ text, state, className = '' }: Props) {
  const displayText = useMemo(() => {
    if (state === EncryptionState.CLEARTEXT) return text;

    return text
      .split('')
      .map((char, _) => {
        if (state === EncryptionState.ENCRYPTED) {
          if (char === ' ') return ' ';
          return ENCRYPTION_CHARS[Math.floor(Math.random() * ENCRYPTION_CHARS.length)];
        }

        if (state === EncryptionState.ENCRYPTING) {
          return Math.random() > 0.5
            ? ENCRYPTION_CHARS[Math.floor(Math.random() * ENCRYPTION_CHARS.length)]
            : char;
        }

        return char;
      })
      .join('');
  }, [text, state]);

  return <span className={`${className} font-mono transition-all duration-75`}>{displayText}</span>;
}
