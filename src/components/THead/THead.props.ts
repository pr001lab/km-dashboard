import { ComponentProps } from 'react';

export interface THeadProps extends ComponentProps<'thead'> {
  sortName?: string;
  sortOrder?: string;
  setColSort?: (item: string) => void;
}
