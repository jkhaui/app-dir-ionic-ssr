'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useInAppNavigation } from '@/hooks';
import { MenuList, MenuListItem } from 'konsta/react';
import * as React from 'react';
import { ComposedNextLink } from '@/components/composed-next-link';
import { NavigationOps } from '@/context-providers';
import { ROOT_PATH } from '@/utils';

export const SideNavBar = ({ tabLabels, tabIcons }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { inAppNavigation, updateInAppNavigation } = useInAppNavigation();

  const { activeTab, nonTabHistoryStack } = inAppNavigation;
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

  React.useEffect(() => {
    // As it stands, this hook seems necessary to listen to users navigating back/forward
    // using the native browser controls and updating the active tab accordingly.
    updateInAppNavigation(NavigationOps.REPLACE_TAB_ROUTE, {
      path: pathname,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, tabRoutes]);

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
  // return null;
  return (
    <MenuList slot={'fixed'} className={'justify-end'}>
      {tabRoutes.map((route, index) => {
        const Icon = tabIcons[index];
        const isActive = route === activeTab;

        const handleClick = () => {
          if (isActive) {
            if (nonTabHistoryStack.length > 0) {
              updateInAppNavigation(NavigationOps.CLEAR_NON_TAB_ROUTES);

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
          updateInAppNavigation(NavigationOps.CLEAR_NON_TAB_ROUTES);
        };

        const color = isActive ? 'text-zinc-100' : 'text-zinc-400';
        return (
          <MenuListItem
            key={route}
            title={
              <div className={`text-xl font-bold`}>{tabLabels[index]}</div>
            }
            linkProps={{
              className:
                'flex items-center rounded-full min-h-[3.5rem] ps-4 duration-300 active:duration-0 cursor-pointer select-none relative overflow-hidden z-10 touch-ripple-black dark:touch-ripple-white bg-transparent',
              navbar: true,
            }}
            href={route}
            active={isActive}
            onClick={handleClick}
            linkComponent={ComposedNextLink}
            titleWrapClassName={color}
            media={<Icon className={`h-6 w-6 ${color}`} />}
            colors={{
              menuListItemActiveBgIos: 'bg-transparent',
              menuListItemBgIos: 'bg-transparent',
              menuListItemActiveBgMaterial: 'bg-transparent',
              menuListItemBgMaterial: 'bg-transparent',
              menuListItemTextMaterial: 'text-white',
            }}
          />
        );
      })}
    </MenuList>
  );
};
