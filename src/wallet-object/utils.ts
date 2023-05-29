import { isValidPrivate } from '@ethereumjs/util';
import { randomBytes } from 'crypto';

export function generateKey() {
  const privateKey = randomBytes(32);
  if (!isValidPrivate(privateKey))
    throw new Error('Private key does not satisfy the curve requirements (ie. it is invalid)');
  return privateKey;
}
