'use client';

import * as React from 'react';
import { Button, Icon } from 'konsta/react';
import { ArrowLeftIcon, CaretLeftIcon } from '@radix-ui/react-icons';

import { IonColors } from '@/types';
import { useNavigateBack, useOptions } from '@/hooks';

interface NextBackButtonProps {
  defaultHref: string | undefined;
  text?: string | void;
  color?: IonColors;
  type: 'button' | 'reset' | 'submit';
  CustomBackIcon?: React.ReactNode;
}

export const NextBackButton = ({
  defaultHref = '/',
  text,
  color,
  type,
  CustomBackIcon,
}: NextBackButtonProps) => {
  const options = useOptions();

  const handleNavigateBack = useNavigateBack(defaultHref);

  return (
    <Button
      clear
      rounded
      onClick={() => {
        handleNavigateBack();
      }}
      colors={{
        textMaterial: 'text-gray-300',
      }}
      large
    >
      <Icon
        ios={
          <span
            className={
              'back-button-wrapper flex items-center font-normal capitalize'
            }
          >
            {CustomBackIcon ?? <CaretLeftIcon className={'h-6 w-6'} />}
            {options?.showBackButtonText && ' '}
            {options?.backButtonText ??
            (options?.showBackButtonText && options.mode === 'ios')
              ? 'Back'
              : ''}
          </span>
        }
        material={CustomBackIcon ?? <ArrowLeftIcon className={'h-6 w-6'} />}
      />
    </Button>
  );
};
