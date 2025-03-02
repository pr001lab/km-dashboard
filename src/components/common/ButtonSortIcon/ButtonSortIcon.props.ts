import { ComponentProps } from 'react';

export interface ButtonSortIconProps extends ComponentProps<'button'> {
  children: React.ReactNode;
  sortOrder?: string;
  onClick: () => void;
}
