'use client';

import * as React from 'react';
import { Button, Icon } from 'konsta/react';
import { ArrowLeftIcon, CaretLeftIcon } from '@radix-ui/react-icons';

import { IonColors } from '@/types';
import { useInAppNavigation, useNavigateBack, useOptions } from '@/hooks';

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

  const { inAppNavigation } = useInAppNavigation();

  const handleNavigateBack = useNavigateBack();

  const [display, setDisplay] = React.useState(
    defaultHref !== undefined || inAppNavigation.nonTabHistoryStack?.length > 0
  );

  React.useEffect(() => {
    if (inAppNavigation.nonTabHistoryStack?.length > 0) {
      setDisplay(true);
    }
  }, [inAppNavigation, inAppNavigation.nonTabHistoryStack]);

  if (!display) {
    return null;
  }

  return (
    <Button
      clear
      rounded
      onClick={() => {
        handleNavigateBack();
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
