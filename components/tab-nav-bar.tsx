'use client';

import * as React from 'react';
import { Icon, Tabbar, TabbarLink } from 'konsta/react';
import { usePathname, useRouter } from 'next/navigation';
import { useInAppNavigation, useOptions } from '@/hooks';
import { ROOT_PATH } from '@/utils';
import { NavigationOps } from '@/context-providers';
import { InAppLink } from '@/components/in-app-link';

export const TabNavBar = ({
  tabLabels,
  tabIcons,
  labels = true,
  icons,
  tabbarProps = {},
}) => {
  const options = useOptions();

  const router = useRouter();

  const { tabRoutes, inAppNavigation, updateInAppNavigation } =
    useInAppNavigation();

  const { activeTab, tabMetadata } = inAppNavigation;

  const { className, bgClassName, ...restTabbarProps } = tabbarProps;
  //
  // React.useEffect(() => {
  //   // As it stands, this hook seems necessary to listen to users navigating back/forward
  //   // using the native browser controls and updating the active tab accordingly.
  //   updateInAppNavigation(NavigationOps.REPLACE_TAB_ROUTE, {
  //     path: pathname,
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname, tabRoutes]);
  //
  if (!tabLabels.length) {
    throw new Error(
      'An array of strings must be provided for the `tabLabels` prop, as these define the routes' +
        'for your application.'
    );
  }
  if (tabLabels.length !== tabIcons.length) {
    throw new Error(
      'If tab icons are provided, they must be in the same position and count as the tab ' +
        'labels. If a given tab should have an icon only, then provide an empty string for that position within ' +
        '`tabLabels`.'
    );
  }

  return (
    <Tabbar
      labels={labels ?? true}
      icons={icons ?? false}
      colors={{
        bgIos: 'bg-ios-light-surface-2',
      }}
      bgClassName={bgClassName ?? (options.theme === 'ios' && 'bg-transparent')}
      className={className ?? 'fixed bottom-0 left-0 z-40'}
      {...restTabbarProps}
    >
      {tabRoutes.map((route, index) => {
        const IconIos = tabIcons[index]?.ios ?? tabIcons[index];
        const IconMaterial = tabIcons[index]?.material ?? tabIcons[index];

        const isActive = route === activeTab;

        const handleClick = () => {
          if (isActive) {
            router.push(route);
            if (tabMetadata.length > 0) {
              updateInAppNavigation(NavigationOps.CLEAR_TAB_HISTORY);

              return;
            }

            updateInAppNavigation(NavigationOps.START_SCROLL_TO_TOP);
            return;
          }

          router.push(route);

          // Updating the current tab and clearing any visible stacked secondary
          // screens must be called as 2 contiguous, synchronous operations.
          // This is because if state is updated as a single action,
          // then the stacked screens will be cleared before transition to the
          // new tab occurs, resulting in janky UX.
          updateInAppNavigation(NavigationOps.REPLACE_TAB_ROUTE, route);
          updateInAppNavigation(NavigationOps.CLEAR_TAB_HISTORY);
        };

        return (
          <TabbarLink
            key={route}
            component={InAppLink}
            href={route}
            active={isActive}
            onClick={handleClick}
            colors={{
              textIos: 'text-slate-400',
              textMaterial: 'text-slate-400',
            }}
            label={tabLabels[index]}
            icon={
              icons &&
              tabIcons.length > 0 && (
                <Icon ios={<IconIos />} material={<IconMaterial />} />
              )
            }
          />
        );
      })}
    </Tabbar>
  );
};
