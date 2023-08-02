'use client';

import * as React from 'react';
import { Icon, Tabbar, TabbarLink } from 'konsta/react';
import { default as NextLink } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const ROOT_PATH = '/';

export const TabNavBar = ({
  tabLabels,
  tabIcons,
  labels,
  icons,
  tabbarProps = {},
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const [activeTab, setActiveTab] = React.useState(ROOT_PATH);

  const { className, bgClassName, ...rest } = tabbarProps;

  if (labels && icons && tabLabels.length !== tabIcons.length) {
    throw new Error('');
  }
  const tabRoutes = [ROOT_PATH, ...tabLabels?.slice(1)];

  return (
    <Tabbar
      labels={labels || true}
      icons={icons || false}
      bgClassName={bgClassName ?? 'bg-slate-900'}
      className={className ?? 'fixed bottom-0 left-0'}
      {...rest}
    >
      {tabRoutes.map((route, index) => {
        const path = `${
          route !== ROOT_PATH ? ROOT_PATH : ''
        }${route.toLowerCase()}`;

        return (
          <TabbarLink
            key={route}
            component={React.forwardRef((props, ref) => (
              <NextLink ref={ref} href={path} {...props} />
            ))}
            active={activeTab === pathname}
            onClick={() => {
              setActiveTab(path);
              router.push(path);
            }}
            lab1el={labels && (route !== ROOT_PATH ? route : tabLabels[index])}
            icon={
              icons &&
              tabIcons.length > 0 && (
                <Icon
                  ios={tabIcons[index]}
                  material={tabIcons[index]}
                  // ios={tabIcons[index]?.ios}
                  // material={tabIcons[index]?.material}
                />
              )
            }
          />
        );
      })}
    </Tabbar>
  );
};
