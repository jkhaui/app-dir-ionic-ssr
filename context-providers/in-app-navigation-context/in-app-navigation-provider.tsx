'use client';

import * as React from 'react';
import InAppNavigationContext from './in-app-navigation-context';
import { usePathname } from 'next/navigation';

export enum NavigationOps {
  INSTANTIATE_TAB_ROUTES = 'instantiate',
  REPLACE_TAB_ROUTE = 'replace',
  PUSH_NON_TAB_ROUTE = 'push',
  POP_NON_TAB_ROUTE = 'pop',
  CLEAR_NON_TAB_ROUTES = 'clear',
  START_SCROLL_TO_TOP = 'start-scroll',
  END_SCROLL_TO_TOP = 'end-scroll',
}

interface InAppNavigation {
  activeTab: string;
  tabRoutes: string[];
  nonTabHistoryStack: string[];
  scrollToTop: boolean;
}

export const InAppNavigationProvider = ({ children }) => {
  const pathname = usePathname();

  const [inAppNavigation, setInAppNavigation] = React.useState<InAppNavigation>(
    {
      activeTab: pathname,
      tabRoutes: [],
      nonTabHistoryStack: [],
      scrollToTop: false,
    }
  );

  const updateInAppNavigation = React.useCallback(
    (op: NavigationOps, params?: { path?: string; routes?: string[] }) => {
      switch (op) {
        case NavigationOps.INSTANTIATE_TAB_ROUTES:
          setInAppNavigation((prevState: InAppNavigation) => ({
            ...prevState,
            ...(params?.routes && {
              tabRoutes: params.routes,
            }),
          }));
          break;
        case NavigationOps.REPLACE_TAB_ROUTE:
          setInAppNavigation((prevState: InAppNavigation) => ({
            ...prevState,
            ...(params?.path && {
              activeTab: params.path,
            }),
          }));
          break;
        case NavigationOps.CLEAR_NON_TAB_ROUTES:
          setInAppNavigation((prevState) => ({
            ...prevState,
            nonTabHistoryStack: [],
          }));
          break;
        case NavigationOps.POP_NON_TAB_ROUTE:
        case NavigationOps.PUSH_NON_TAB_ROUTE:
          setInAppNavigation(
            ({ nonTabHistoryStack, ...prevState }: InAppNavigation) => ({
              ...prevState,
              nonTabHistoryStack:
                op === NavigationOps.PUSH_NON_TAB_ROUTE
                  ? [
                      ...(nonTabHistoryStack && nonTabHistoryStack),
                      params?.path,
                    ]
                  : nonTabHistoryStack.slice(0, -1),
            })
          );
          break;
        case NavigationOps.START_SCROLL_TO_TOP:
        case NavigationOps.END_SCROLL_TO_TOP:
          setInAppNavigation((prevState) => ({
            ...prevState,
            scrollToTop: op === NavigationOps.START_SCROLL_TO_TOP,
          }));
          break;
        default:
          break;
      }
    },
    []
  );

  const memoizedInAppNavigationObj = React.useMemo(
    () => ({
      inAppNavigation,
      updateInAppNavigation,
    })
    // [inAppNavigation, updateInAppNavigation]
  );

  return (
    <InAppNavigationContext.Provider value={memoizedInAppNavigationObj}>
      {children}
    </InAppNavigationContext.Provider>
  );
};
