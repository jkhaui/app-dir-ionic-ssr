'use client';

import * as React from 'react';
import type { Components } from 'react-virtuoso';
import { Virtuoso } from 'react-virtuoso';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
import { Block } from 'konsta/react';
import { useOptions } from '@/hooks';

export const PageShell = ({ children }) => {
  const virtuosoRef = React.useRef(null);

  return (
    <Virtuoso
      ref={virtuosoRef}
      // onScroll={(e) => console.log(e.target.scrollTop)}
      components={{ Scroller }}
      className='ion-content-scroll-host min-h-full px-2 pt-16 text-gray-100'
      initialItemCount={1}
      itemContent={() => children}
      totalCount={1}
    />
  );
};

const Header: Components['Header'] = () => {
  const options = useOptions();

  return (
    <ion-header collapse={'condense'}>
      <ion-toolbar color={'transparent'}>
        <ion-title
          size={options.headerTitleSize}
          color={options?.headerTitleColor}
        >
          {options.headerTitle}
        </ion-title>
      </ion-toolbar>
    </ion-header>
  );
};

const Scroller: Components['Scroller'] = React.forwardRef(
  ({ style, children, ...rest }, ref) => {
    const options = useOptions();

    const [initialize] = useOverlayScrollbars({
      options: {
        showNativeOverlaidScrollbars: false,
        overflow: {
          x: 'hidden',
        },
        scrollbars: {
          theme: 'os-theme-dark',
          clickScroll: true,
          visibility: 'visible',
        },
      },
    });

    React.useEffect(() => {
      if (!ref) {
        return;
      }

      initialize({
        target: ref.current,
        elements: {
          viewport: ref.current,
        },
      });
    }, [initialize, ref]);

    return (
      <ion-content fullscreen scroll-y={false}>
        {options.pullToRefresh && (
          <ion-refresher
            id='refresher'
            slot='fixed'
            pull-factor={0.5}
            pull-min={1500}
            pull-factor={1.2}
          >
            <ion-refresher-content></ion-refresher-content>
          </ion-refresher>
        )}
        <div ref={ref} style={style} {...rest}>
          <Header />
          <Block className={'pt-16'}>{children}</Block>
        </div>
      </ion-content>
    );
  }
);
