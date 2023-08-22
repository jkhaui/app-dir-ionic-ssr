import * as React from 'react';
import { isArray } from 'lodash-es';
import { lock, unlock, clearBodyLocks } from 'tua-body-scroll-lock';

interface InjectPwaStyleOptions {
  bodyScrollLockEnabled: boolean;
  preventIosTouchZoom: boolean;
  scrollableElementExceptions?: HTMLElement | HTMLElement[];
}

export const useInjectPwaStyles = (
  enabled: boolean,
  options: InjectPwaStyleOptions
) => {
  React.useInsertionEffect(() => {
    if (!enabled) {
      return null;
    }
  });
};
