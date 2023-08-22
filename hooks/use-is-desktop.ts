'use client';

import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '@/utils';

export const useIsDesktop = () => {
  return useMediaQuery({
    query: `(min-width: ${breakpoints?.lg})`,
  });
};
