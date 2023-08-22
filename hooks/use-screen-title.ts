'use client';

import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { ROOT_PATH, uppercaseString } from '@/utils';
import { useOptions } from './use-options';

export const useScreenTitle = () => {
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname();
  const options = useOptions();
  console.log(options);
  if (segment === null) {
    if (pathname === ROOT_PATH) {
      return '';
      // return options.tabLabels[0];
    }

    return uppercaseString(pathname.replace('/', ''));
  }

  return uppercaseString(segment);
};
