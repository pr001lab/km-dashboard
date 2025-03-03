import { ComponentProps, ReactNode } from 'react';

export interface WrapperProps extends ComponentProps<'div'> {
  children: ReactNode;
  className?: string;
}
