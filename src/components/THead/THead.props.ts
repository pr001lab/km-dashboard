import { ComponentProps } from 'react';

export interface THeadProps extends ComponentProps<'thead'> {
  sortName?: string;
  sortOrder?: string;
  setSort?: (item: string) => void;
}
