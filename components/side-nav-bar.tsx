'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useInAppNavigation } from '@/hooks';
import { MenuList, MenuListItem } from 'konsta/react';
import * as React from 'react';
import { NavigationOps } from '@/context-providers';
import { ROOT_PATH } from '@/utils';
import { InAppLink } from '@/components/in-app-link';
import { throwError } from '@/utils/throw-error';

interface SideNavBarProps {
  tabLabels: string[];
  tabIcons: React.ReactNode[];
  showSidebarIcons: boolean;
}

export const SideNavBar = ({
  tabLabels,
  tabIcons,
  showSidebarIcons,
}: SideNavBarProps) => {
  const { tabRoutes, inAppNavigation, updateInAppNavigation } =
    useInAppNavigation();

  const { activeTab, tabMetadata } = inAppNavigation;

  // React.useEffect(() => {
  //   // As it stands, this hook seems necessary to listen to users navigating back/forward
  //   // using the native browser controls and updating the active tab accordingly.
  //   updateInAppNavigation(NavigationOps.REPLACE_TAB_ROUTE, {
  //     path: pathname,
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname, tabRoutes]);

  throwError([
    [
      !tabLabels.length,
      'An array of strings must be provided for the `tabLabels` prop, as these define the routes' +
        'for your application.',
    ],
    [
      tabLabels.length !== tabIcons.length,
      'If tab icons are provided, they must be in the same position and count as the tab ' +
        'labels. If a given tab should have an icon only, then provide an empty string for that position within ' +
        '`tabLabels`.',
    ],
    [tabLabels.length > 5, 'No more than 5 base tab routes can be specified.'],
  ]);

  return (
    <MenuList slot={'fixed'} className={'justify-end'}>
      {tabRoutes.map((route, index) => {
        const Icon = tabIcons[index];
        const isActive = route === activeTab;

        const color = isActive ? 'text-primary' : 'dark:text-zinc-200';

        return (
          <MenuListItem
            key={route}
            title={
              <div className={`text-xl font-semibold`}>{tabLabels[index]}</div>
            }
            linkProps={{
              className:
                'flex items-center rounded-full min-h-[3.5rem] ml-2-safe mr-2-safe ps-4 duration-300 active:duration-0 cursor-pointer select-none relative overflow-hidden z-10 touch-ripple-black dark:touch-ripple-white bg-transparent',
              // navbar: true,
            }}
            href={route}
            active={isActive}
            // onClick={handleClick}
            linkComponent={React.forwardRef((props, ref) => (
              <InAppLink ref={ref} {...props} />
            ))}
            titleWrapClassName={color}
            media={showSidebarIcons && <Icon className={`h-6 w-6 ${color}`} />}
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
