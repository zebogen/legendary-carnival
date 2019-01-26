import React, { ComponentType } from 'react';
import { Omit } from '../types';

export default function withProps<WrappedProps, InjectedProps>(
  WrappedComponent: ComponentType<WrappedProps>,
  injectedProps: InjectedProps,
): ComponentType<WrappedProps> {
  // Unfortunately, we have to cast props to any in order to avoid an error in TS 3.2. 
  // Relevant issue: https://github.com/Microsoft/TypeScript/issues/28748
  // TODO: remove typecast when fixed
  return (props: Omit<WrappedProps, keyof InjectedProps>) => (
    <WrappedComponent {...(props as any)} {...injectedProps} />
  );
}