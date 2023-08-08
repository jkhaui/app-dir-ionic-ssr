'use client';

import { Button, Icon } from 'konsta/react';
import { ArrowLeftIcon, CaretLeftIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

import { IonColors } from '@/types';
import { useInAppNavigation, useOptions } from '@/hooks';
import * as React from 'react';
import type { NavigationOps } from '@/context-providers';

interface NextBackButtonProps {
  defaultHref: string | undefined;
  text?: string | void;
  color?: IonColors;
  type: 'button' | 'reset' | 'submit';
  CustomBackIcon?: React.ReactNode;
}

export const NextBackButton = ({
  defaultHref,
  text,
  color,
  type,
  CustomBackIcon,
}: NextBackButtonProps) => {
  const options = useOptions();

  const { inAppNavigation, updateInAppNavigation } = useInAppNavigation();

  const router = useRouter();
  console.log(router, window.history, inAppNavigation);
  const showBackButton =
    defaultHref !== undefined && inAppNavigation.nonTabHistoryStack.length > 0;

  if (!showBackButton) {
    return null;
  }

  return (
    <Button
      clear
      rounded
      onClick={() => {
        router.back();
        updateInAppNavigation(NavigationOps.POP_NON_TAB_ROUTE);
      }}
      colors={{
        activeBgIos: '',
        activeBgMaterial: '',
      }}
    >
      <Icon
        ios={
          <span
            className={
              'back-button-wrapper flex items-center font-normal capitalize'
            }
          >
            {CustomBackIcon ?? <CaretLeftIcon />}
            {options?.showBackButtonText && ' '}
            {options?.backButtonText ??
            (options?.showBackButtonText && options.mode === 'ios')
              ? 'Back'
              : ''}
          </span>
        }
        material={CustomBackIcon ?? <ArrowLeftIcon />}
      />
    </Button>
  );
};
