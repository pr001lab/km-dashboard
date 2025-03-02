import { ComponentProps } from 'react';

export interface ButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode;
  onClick: () => void;
}
