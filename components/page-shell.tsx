'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import type { Components } from 'react-virtuoso';
import { Virtuoso } from 'react-virtuoso';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
import { Block } from 'konsta/react';
import OptionsContext from '@/contexts/options-context';

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
  const options = React.useContext(OptionsContext);

  return (
    <ion-header collapse={'condense'}>
      <ion-toolbar color={'transparent'}>
        <ion-title size={'large'}>{options.headerTitle}</ion-title>
      </ion-toolbar>
    </ion-header>
  );
};

const Scroller: Components['Scroller'] = React.forwardRef(
  ({ style, children, ...rest }, ref) => {
    const options = React.useContext(OptionsContext);

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
