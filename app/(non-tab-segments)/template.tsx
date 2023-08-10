'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { NonTabSegmentTemplate } from '@/components';
import { useInAppNavigation } from '@/hooks';
import { NavigationOps } from '@/context-providers';

export default function Template({ children }) {
  const { inAppNavigation, updateInAppNavigation } = useInAppNavigation();
  const { nonTabHistoryStack } = inAppNavigation;

  const pathname = usePathname();

  React.useEffect(() => {
    if (!nonTabHistoryStack.includes(pathname)) {
      updateInAppNavigation(NavigationOps.PUSH_NON_TAB_ROUTE, {
        path: pathname,
      });
    }
  }, [pathname, updateInAppNavigation, nonTabHistoryStack]);

  // This is necessary with Next's parallel routes to clear
  // stacked screens from view if the in-app history stack
  // is empty (i.e. only the tab route should be visible).
  if (nonTabHistoryStack.length === 0) {
    return null;
  }

  return <NonTabSegmentTemplate>{children}</NonTabSegmentTemplate>;
}
