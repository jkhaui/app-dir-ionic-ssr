'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { TITLE } from '@/app/constants';
import type { Components } from 'react-virtuoso';
import { Virtuoso } from 'react-virtuoso';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
import { Block } from 'konsta/react';

export const PageShell = ({ children }) => {
  const virtuosoRef = React.useRef(null);

  return (
    <motion.div
      className={'ion-page'}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      <Virtuoso
        ref={virtuosoRef}
        // onScroll={(e) => console.log(e.target.scrollTop)}
        components={{ Scroller }}
        className='ion-content-scroll-host min-h-full px-2 pt-16 text-gray-100'
        initialItemCount={1}
        itemContent={() => children}
        totalCount={1}
      />
    </motion.div>
  );
};

const Header: Components['Header'] = () => {
  return (
    <ion-header collapse={'condense'}>
      <ion-toolbar color={'transparent'}>
        <ion-title size={'large'}>{TITLE}</ion-title>
      </ion-toolbar>
    </ion-header>
  );
};

const Scroller: Components['Scroller'] = React.forwardRef(
  ({ style, children, ...rest }, ref) => {
    const [initialize, instance] = useOverlayScrollbars({
      // Just an example of providing custom options; they're not necessary to get
      // `overlayscrollbars-react` working with `react-virtuoso`
      options: {
        showNativeOverlaidScrollbars: false,
        overflow: {
          x: 'hidden',
        },
        scrollbars: {
          theme: 'os-theme-dark',
          clickScroll: true,
          visibility: 'auto',
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
        <ion-refresher
          id='refresher'
          slot='fixed'
          pull-factor={0.5}
          pull-min={1500}
          pull-factor={1.2}
        >
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <div ref={ref} style={style} {...rest}>
          <Header />
          <Block className={'pt-16'}>{children}</Block>
        </div>
      </ion-content>
    );
  }
);
