'use client';

import * as React from 'react';
import { Button, Icon } from 'konsta/react';
import { BellIcon } from '@radix-ui/react-icons';

interface NotificationsIconButton {
  defaultHref: string | undefined;
  text?: string | void;
  color?: string;
  large?: boolean;
  type: 'button' | 'reset' | 'submit';
  CustomIcon?: React.ReactNode;
}

export const NotificationsIconButton = ({
  color = 'text-zinc-100',
  large = true,
  type,
  CustomIcon,
  ...restButtonProps
}: NotificationsIconButton) => {
  return (
    <Button
      clear
      rounded
      colors={{
        textMaterial: color,
        textIos: color,
      }}
      large={large}
      {...restButtonProps}
    >
      <Icon
        ios={CustomIcon ?? <BellIcon className={'h-6 w-6'} />}
        material={CustomIcon ?? <BellIcon className={'h-6 w-6'} />}
      />
    </Button>
  );
};
