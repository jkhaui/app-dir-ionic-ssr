'use client';

import {
  useRouter,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from 'next/navigation';
import { useInAppNavigation } from './use-in-app-navigation';
import { NavigationOps } from '@/context-providers';
import { flushSync } from 'react-dom';
import { useSegmentAsRoute } from '@/hooks/use-segment-as-route';
import { ROOT_PATH } from '@/utils';

/**
 *
 * Navigating "back" within the app follows the following strategies,
 * in order:
 *
 * 1. Check if the current tab has a valid history stack.
 * If so, navigate to the 2nd last route within this stack.
 *
 * 2. If the current route is a nested path, then we navigate one
 * sub-path up; e.g. `/settings/notifications` will navigate to
 * `/settings` when the back button is clicked and no history
 * can be found for the `/settings` tab.
 *
 * 3. Finally, a `defaultHref` prop can be set as the final
 * fallback route. By default, this is set to `/` which should
 * work fine for most use-cases, but can be modified, e.g.
 * navigating to a base i18n route if internationalization is used.
 * */
export const useNavigateBack = (defaultHref: string = ROOT_PATH) => {
  const router = useRouter();

  const {
    updateInAppNavigation,
    inAppNavigation: { tabMetadata, activeTab },
  } = useInAppNavigation();

  const currentTabHistory = tabMetadata?.get(activeTab);

  return () => {
    const noHistoryExists = currentTabHistory?.length === 1;

    // Handle any edge-cases where the history stack for a given tab may be empty.
    if (noHistoryExists) {
      updateInAppNavigation(NavigationOps.REPLACE_TAB_ROUTE, {
        screenId: defaultHref,
      });
      updateInAppNavigation(NavigationOps.CLEAR_TAB_HISTORY);

      router.push(defaultHref);

      return;
    }

    const secondLastRouteInHistory =
      currentTabHistory?.[currentTabHistory?.length - 2]?.screenId;
    const targetBackRoute = secondLastRouteInHistory ?? activeTab;

    updateInAppNavigation(NavigationOps.POP_SECONDARY_ROUTE_FROM_TAB_HISTORY);
    router.push(targetBackRoute, {
      scroll: false,
    });
  };
};
