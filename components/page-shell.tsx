'use client';

import { motion } from 'framer-motion';
import { TITLE } from '@/app/constants';
import * as React from 'react';
import { Components, Virtuoso } from 'react-virtuoso';
import { useOverlayScrollbars } from 'overlayscrollbars-react';

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
        components={{ Scroller, Header }}
        className='ion-content-scroll-host min-h-full bg-slate-900 px-2 text-gray-100'
        style={{
          marginTop: '-7px',
        }}
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
      <ion-toolbar>
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
          visibility: 'visible',
        },
      },
    });

    React.useEffect(() => {
      initialize(
        {
          target: ref.current,
          elements: {
            viewport: ref.current,
          },
        },
        {}
      );
    }, [initialize]);

    const refSetter = React.useCallback(
      (node) => {
        if (node) {
          ref.current = node;
        }
      },
      [ref]
    );

    return (
      <ion-content fullscreen scroll-y={false}>
        <div ref={refSetter} style={style} {...rest}>
          {children}
        </div>
      </ion-content>
    );
  }
);
