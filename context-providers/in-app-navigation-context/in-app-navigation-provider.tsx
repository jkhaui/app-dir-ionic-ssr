'use client';

import * as React from 'react';
import InAppNavigationContext from './in-app-navigation-context';
import { usePathname } from 'next/navigation';

export enum NavigationOps {
  REPLACE_TAB_ROUTE = 'replace',
  PUSH_NON_TAB_ROUTE = 'push',
  POP_NON_TAB_ROUTE = 'pop',
  CLEAR_NON_TAB_ROUTES = 'clear',
}

export const InAppNavigationProvider = ({ children }) => {
  const pathname = usePathname();

  const [inAppNavigation, setInAppNavigation] = React.useState({
    activeTab: pathname,
    nonTabHistoryStack: [],
  });

  const updateInAppNavigation = (op: NavigationOps, path?: string) => {
    if (op === NavigationOps.REPLACE_TAB_ROUTE) {
      setInAppNavigation((prevState) => ({
        ...prevState,
        activeTab: path,
      }));

      return;
    }

    if (op === NavigationOps.CLEAR_NON_TAB_ROUTES) {
      setInAppNavigation(({ activeTab }: { activeTab: string }) => ({
        activeTab,
        nonTabHistoryStack: [],
      }));
    }

    setInAppNavigation(
      ({ nonTabHistoryStack }: { nonTabHistoryStack: string[] }) =>
        op === NavigationOps.PUSH_NON_TAB_ROUTE
          ? [...nonTabHistoryStack, path]
          : [...nonTabHistoryStack.slice(0, -1)]
    );
  };

  const memoizedInAppNavigationObj = React.useMemo(
    () => ({
      inAppNavigation,
      updateInAppNavigation,
    }),
    [inAppNavigation, updateInAppNavigation]
  );

  return (
    <InAppNavigationContext.Provider value={memoizedInAppNavigationObj}>
      {children}
    </InAppNavigationContext.Provider>
  );
};
