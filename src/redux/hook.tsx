import { EqualityFn, useSelector } from 'react-redux';
import { RootState } from './store';

export function useAppSelector<Selected>(
  selector: (state: RootState) => Selected,
  equalityFn?: EqualityFn<Selected> | undefined
) {
  return useSelector<RootState, Selected>(selector, equalityFn);
}
