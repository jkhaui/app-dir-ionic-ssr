'use client';

import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { useInAppNavigation } from '@/hooks';
import { NavigationOps } from '@/context-providers';
import { getTargetTabFromHref } from '@/utils';

interface InAppLinkProps extends LinkProps {
  handleClickBeforeTransition?: boolean;
  children?: JSX.Element;
  clearNavigationStack?: boolean;
  preventRouteChange?: boolean;
  fromTabLink?: boolean;
}

export const InAppLink = React.forwardRef<InAppLinkProps, HTMLAnchorElement>(
  (
    {
      href,
      replace = true,
      scroll = false,
      onClick,
      handleClickBeforeTransition,
      clearNavigationStack,
      preventRouteChange,
      ...nextLinkProps
    }: InAppLinkProps,
    ref
  ) => {
    const router = useRouter();

    const {
      inAppNavigation: { tabMetadata, activeTab },
      tabRoutes,
      updateInAppNavigation,
    } = useInAppNavigation();

    const handleClick = (e) => {
      // We intercept the click event and prevent navigation occurring via the
      // provided `href`. This is because we need full control over routing.
      // Next's `Link` component is still used to take advantage of its
      // preloading functionality.
      e.preventDefault();

      if (onClick) {
        handleClickBeforeTransition && onClick(e);
      }

      if (preventRouteChange) {
        e.stopPropagation();

        return;
      }

      const isSecondaryRoute = !tabRoutes.includes(href);

      const targetTab = getTargetTabFromHref(href);
      const targetTabHistory = tabMetadata.get(targetTab);

      const currentTabHistory = tabMetadata.get(activeTab);

      const isSwitchingTabs = activeTab !== targetTab;
      console.log(isSwitchingTabs, isSecondaryRoute);
      if (isSecondaryRoute) {
        // const routeExistsInCurrentTabHistory = currentTabHistory.includes(href);
        const routeExistsInCurrentTabHistory = currentTabHistory.some(
          (route) => route?.screenId?.includes(href)
        );
        console.log(routeExistsInCurrentTabHistory);
        if (!routeExistsInCurrentTabHistory) {
          updateInAppNavigation(
            NavigationOps.PUSH_SECONDARY_ROUTE_TO_TAB_HISTORY,
            {
              screenId: href,
            }
          );
          router.push(href);
        }

        return;
      }

      if (!isSwitchingTabs) {
        // const currentTabHistoryExists = currentTabHistory.length > 0;
        const currentTabHistoryExists = currentTabHistory.length > 1;

        if (currentTabHistoryExists) {
          updateInAppNavigation(NavigationOps.CLEAR_TAB_HISTORY);
        } else {
          updateInAppNavigation(NavigationOps.START_SCROLL_TO_TOP);
        }

        router.push(href);

        return;
      }

      // const targetTabHistoryExists = targetTabHistory.length > 0;
      const targetTabHistoryExists = targetTabHistory.length > 1;

      updateInAppNavigation(NavigationOps.REPLACE_TAB_ROUTE, {
        screenId: targetTab,
      });
      router.push(
        targetTabHistoryExists
          ? targetTabHistory[targetTabHistory.length - 1]?.screenId
          : href
      );

      if (onClick) {
        !handleClickBeforeTransition && onClick(e);
      }
    };

    return (
      <Link
        ref={ref}
        href={href}
        onClick={handleClick}
        scroll={scroll}
        replace={replace}
        {...nextLinkProps}
      />
    );
  }
);
