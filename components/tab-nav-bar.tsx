'use client';

import * as React from 'react';
import { Icon, Tabbar, TabbarLink } from 'konsta/react';
import type { LinkProps } from 'next/link';
import { default as NextLink } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface ComposedNextLinkProps extends LinkProps {
  active?: boolean;
  component?: string;
  linkProps?: any;
  icon?: React.ReactNode;
  label?: string | React.ReactNode;
}

const ROOT_PATH = '/';

const ComposedNextLink = React.forwardRef<ComposedNextLinkProps, any>(
  (props, ref) => <NextLink ref={ref} href={props.path} {...props} />
);

export const TabNavBar = ({
  tabLabels,
  tabIcons,
  labels = true,
  icons,
  tabbarProps = {},
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const [activeTab, setActiveTab] = React.useState(pathname);

  const { className, bgClassName, ...rest } = tabbarProps;

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

  const tabRoutes = [ROOT_PATH, ...tabLabels.slice(1)];

  return (
    <Tabbar
      labels={labels ?? true}
      icons={icons ?? false}
      bgClassName={bgClassName ?? 'bg-transparent'}
      className={className ?? 'fixed bottom-0 left-0'}
      {...rest}
    >
      {tabRoutes.map((route, index) => {
        const path = `${
          route !== ROOT_PATH ? ROOT_PATH : ''
        }${route.toLowerCase()}`;

        const IconIos = tabIcons[index]?.ios ?? tabIcons[index];
        const IconMaterial = tabIcons[index]?.material ?? tabIcons[index];

        return (
          <TabbarLink
            key={route}
            component={ComposedNextLink}
            href={path}
            active={path === activeTab}
            onClick={() => {
              setActiveTab(path);
              router.push(path);
            }}
            colors={{
              textIos: 'text-slate-400',
              textMaterial: 'text-slate-400',
            }}
            label={labels && (route !== ROOT_PATH ? route : tabLabels[index])}
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
