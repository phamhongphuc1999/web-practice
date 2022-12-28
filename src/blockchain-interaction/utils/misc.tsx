import { PlainObject, RuntimeObject } from '../type';

export const hasProperty = (object: RuntimeObject, name: string | number | symbol): boolean =>
  Object.hasOwnProperty.call(object, name);

export function isPlainObject(value: unknown): value is PlainObject {
  if (typeof value !== 'object' || value === null) return false;
  try {
    let proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
  } catch (_) {
    return false;
  }
}
