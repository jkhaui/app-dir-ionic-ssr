import * as React from 'react';
import { default as NextLink, LinkProps } from 'next/link';

export interface ComposedNextLinkProps extends LinkProps {
  active?: boolean;
  component?: string;
  linkProps?: any;
  icon?: React.ReactNode;
  label?: string | React.ReactNode;
}

export const ComposedNextLink = React.forwardRef<ComposedNextLinkProps, any>(
  (props, ref) => {
    return <NextLink ref={ref} {...props} />;
  }
);
