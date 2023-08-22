'use client';

import * as React from 'react';
import InAppNavigationContext from './in-app-navigation-context';
import { usePathname, useSelectedLayoutSegments } from 'next/navigation';
import {
  getTitleFromSegments,
  isSSR,
  ROOT_PATH,
  SESSION_STORAGE_IN_APP_HISTORY_KEY,
} from '@/utils';
import { produce } from 'immer';
import superjson from 'superjson';
import { useSegmentAsRoute } from '@/hooks';
import useSessionStorageState from 'use-session-storage-state';

export enum NavigationOps {
  REPLACE_TAB_ROUTE = 'replace',
  PUSH_SECONDARY_ROUTE_TO_TAB_HISTORY = 'push',
  POP_SECONDARY_ROUTE_FROM_TAB_HISTORY = 'pop',
  CLEAR_TAB_HISTORY = 'clear',
  START_SCROLL_TO_TOP = 'start-scroll',
  END_SCROLL_TO_TOP = 'end-scroll',
}

interface InAppNavigation {
  activeTab: string;
  tabMetadata: any;
  scrollToTop: boolean;
  segments: any;
}

export const InAppNavigationProvider = ({ children, tabLabels }) => {
  const tabRoutes = React.useMemo(
    () => [
      ROOT_PATH,
      ...tabLabels
        .slice(1)
        .map(
          (route: string) =>
            `${route !== ROOT_PATH ? ROOT_PATH : ''}${route.toLowerCase()}`
        ),
    ],
    [tabLabels]
  );
  const initialTabsHistoryState = React.useMemo(() => {
    const tabs = new Map();
    tabRoutes.forEach((route) => {
      tabs.set(route, [
        {
          screenId: route,
          scrollDepth: 0,
        },
      ]);
    });

    return tabs;
  }, [tabRoutes]);

  const segmentRoute = useSegmentAsRoute();
  const segments = useSelectedLayoutSegments();

  // const [inAppNavigation, setInAppNavigation, { removeItem }] =
  //   useSessionStorageState<InAppNavigation>(
  //     SESSION_STORAGE_IN_APP_HISTORY_KEY,
  //     {
  //       defaultValue: {
  //         activeTab: segmentRoute,
  //         tabMetadata: initialTabsHistoryState,
  //         scrollToTop: false,
  //         segments: segments,
  //       },
  //       serializer: {
  //         stringify: superjson.stringify,
  //         parse: superjson.parse,
  //       },
  //     }
  //   );
  const [inAppNavigation, setInAppNavigation] = React.useState<InAppNavigation>(
    {
      activeTab: segmentRoute,
      tabMetadata: initialTabsHistoryState,
      scrollToTop: false,
      segments: segments,
    }
  );

  const pathname = usePathname();
  const [currentTitle, setCurrentTitle] = React.useState<string>(
    getTitleFromSegments(pathname)
  );
  const updateCurrentTitle = React.useCallback((title: string) => {
    setCurrentTitle(title);
  }, []);

  const updateInAppNavigation = React.useCallback(
    (
      op: NavigationOps,
      params?: {
        path?: string;
        currentTitle?: string;
        routes?: string[];
      }
    ) => {
      switch (op) {
        case NavigationOps.REPLACE_TAB_ROUTE:
          setInAppNavigation((prevState: InAppNavigation) => ({
            ...prevState,
            ...(params?.screenId && {
              activeTab: params.screenId,
            }),
          }));
          break;
        case NavigationOps.CLEAR_TAB_HISTORY:
          setInAppNavigation(
            produce((draft) => {
              const tabHistory = draft.tabMetadata.get(segmentRoute);
              if (tabHistory.length > 1) {
                tabHistory.splice(0, tabHistory.length);
              }
            })
          );
          break;
        case NavigationOps.POP_SECONDARY_ROUTE_FROM_TAB_HISTORY:
        case NavigationOps.PUSH_SECONDARY_ROUTE_TO_TAB_HISTORY:
          setInAppNavigation(
            produce((draft) => {
              const tabHistory = draft.tabMetadata.get(segmentRoute);

              op === NavigationOps.PUSH_SECONDARY_ROUTE_TO_TAB_HISTORY
                ? tabHistory.push({
                    screenId: params?.screenId,
                    scrollDepth: 0,
                  })
                : tabHistory.length > 0 && tabHistory.pop();
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
    }
  );

  React.useEffect(() => {
    setCurrentTitle(getTitleFromSegments(pathname));
  }, [pathname]);

  const clearAllNavigationHistory = React.useCallback(() => {}, []);

  const memoizedInAppNavigationObj = React.useMemo(() => ({
    inAppNavigation,
    updateInAppNavigation,
    tabRoutes,
    currentTitle,
    updateCurrentTitle,
    clearAllNavigationHistory,
  }));
  // console.log(inAppNavigation);
  return (
    <InAppNavigationContext.Provider value={memoizedInAppNavigationObj}>
      {children}
    </InAppNavigationContext.Provider>
  );
};
