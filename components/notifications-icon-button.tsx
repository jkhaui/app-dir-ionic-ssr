'use client';

import * as React from 'react';
import { Button, Icon } from 'konsta/react';
import { BellIcon } from '@radix-ui/react-icons';

interface NotificationsIconButtonProps {
  text?: string | void;
  color?: string;
  large?: boolean;
  type: 'button' | 'reset' | 'submit';
  CustomIcon?: React.ReactNode;
}

export const NotificationsIconButton = React.forwardRef(
  (
    {
      color = 'text-zinc-100',
      large = true,
      type,
      CustomIcon,
      ...restProps
    }: NotificationsIconButtonProps,
    ref
  ) => {
    return (
      <Button
        ref={ref}
        clear
        rounded
        colors={{
          textMaterial: color,
          textIos: color,
        }}
        large={large}
        {...restProps}
      >
        <Icon
          ios={CustomIcon ?? <BellIcon className={'h-6 w-6'} />}
          material={CustomIcon ?? <BellIcon className={'h-6 w-6'} />}
        />
      </Button>
    );
  }
);
