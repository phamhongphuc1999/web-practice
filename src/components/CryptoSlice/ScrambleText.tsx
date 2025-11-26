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
        // If fully encrypted, scramble everything
        if (state === EncryptionState.ENCRYPTED) {
          if (char === ' ') return ' ';
          return ENCRYPTION_CHARS[Math.floor(Math.random() * ENCRYPTION_CHARS.length)];
        }

        // If encrypting (transition), 50/50 chance
        if (state === EncryptionState.ENCRYPTING) {
          return Math.random() > 0.5
            ? ENCRYPTION_CHARS[Math.floor(Math.random() * ENCRYPTION_CHARS.length)]
            : char;
        }

        return char;
      })
      .join('');
  }, [text, state]); // Re-calculates on render which gives the "glitch" effect naturally if parent re-renders rapidly

  return <span className={`${className} font-mono transition-all duration-75`}>{displayText}</span>;
}
