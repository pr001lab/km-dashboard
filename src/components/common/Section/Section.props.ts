import { ComponentProps, ReactNode } from 'react';

export interface SectionProps extends ComponentProps<'section'> {
  children: ReactNode;
}
