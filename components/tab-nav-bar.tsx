'use client';

import * as React from 'react';
import { Tabbar, TabbarLink } from 'konsta/react';
import { default as NextLink } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const routeLabels = ['/', 'Account', 'Contact', 'Settings'];

export const TabNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [activeTab, setActiveTab] = React.useState('/');

  return (
    <Tabbar labels className={'fixed bottom-0 left-0 bg-gray-900'}>
      {routeLabels.map((route) => {
        const path = `${route !== '/' ? '/' : ''}${route.toLowerCase()}`;

        return (
          <TabbarLink
            key={route}
            component={React.forwardRef((props, ref) => (
              <NextLink ref={ref} {...props} href={path} />
            ))}
            active
            onClick={() => {
              setActiveTab(path);
              router.push(path);
            }}
            label={route !== '/' ? route : 'Home'}
          />
        );
      })}
    </Tabbar>
  );
};
