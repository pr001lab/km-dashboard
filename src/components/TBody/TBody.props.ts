import { ComponentProps } from 'react';
import { Test } from '../../types';

export interface TBodyProps extends ComponentProps<'tbody'> {
  tests: Test[];
}
