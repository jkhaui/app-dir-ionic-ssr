'use client';

import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { ROOT_PATH } from '@/utils';
import { useOptions } from './use-options';

const uppercaseString = (string: string) =>
  string[0].toUpperCase() + string.substring(1);

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
