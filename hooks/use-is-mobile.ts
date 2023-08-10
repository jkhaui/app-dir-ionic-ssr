'use client';

import { useMediaQuery } from 'react-responsive';
import { useIsNativePlatform } from './use-is-native-platform';
import { breakpoints } from '@/utils';

export const useIsMobile = () => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${breakpoints?.sm?.max})`,
  });
  const isNative = useIsNativePlatform();

  return isMobile || isNative;
};
