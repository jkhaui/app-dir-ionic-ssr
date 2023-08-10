'use client';

import * as React from 'react';
import type { Components } from 'react-virtuoso';
import { Virtuoso } from 'react-virtuoso';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
import { Block } from 'konsta/react';
import { motion } from 'framer-motion';
import { useInAppNavigation, useOptions, useScreenTitle } from '@/hooks';
import { NextBackButton } from '@/components/next-back-button';
import { NavigationOps } from '@/context-providers';

interface ScreenProps extends AnimatedScreenWrapperProps {
  animateLeftToRight?: boolean;
  animateBottomToTop?: boolean;
  options: any;
  inAppNavigation: any;
  overlayTabbar: boolean;
}

interface AnimatedScreenWrapperProps extends React.HTMLProps<any> {
  overlayTabbar: boolean;
  animateLeftToRight?: boolean;
  children: JSX.Element;
  pullToRefreshOptions: any;
}

type PullToRefreshOptions = {
  enabled: boolean;
};
const AnimatedScreenWrapper = ({
  overlayTabbar,
  animateLeftToRight,
  children,
}: AnimatedScreenWrapperProps) => {
  return (
    <motion.div
      className={`ion-page ${
        overlayTabbar ? 'z-50' : 'z-30'
      } min-h-full min-w-full bg-slate-900`}
      initial={{ [animateLeftToRight ? 'x' : 'y']: 300, opacity: 0 }}
      animate={{ [animateLeftToRight ? 'x' : 'y']: 0, opacity: 1 }}
      exit={{ [animateLeftToRight ? 'x' : 'y']: 300, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
};

export const Screen = ({
  children,
  overlayTabbar = false,
  animateLeftToRight,
  animateBottomToTop,
  pullToRefreshOptions = {},
}: ScreenProps) => {
  const virtuosoRef = React.useRef(null);

  const {
    updateInAppNavigation,
    inAppNavigation: { scrollToTop },
  } = useInAppNavigation();

  React.useEffect(() => {
    if (scrollToTop) {
      updateInAppNavigation(NavigationOps.END_SCROLL_TO_TOP);
      virtuosoRef.current.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    }
  }, [scrollToTop, updateInAppNavigation]);

  return (
    <Virtuoso
      ref={virtuosoRef}
      // onScroll={(e) => console.log(e.target.scrollTop)}
      components={{ Scroller }}
      className='ion-content-scroll-host min-h-full px-2 pt-16 text-gray-100'
      initialItemCount={1}
      itemContent={() => children}
      totalCount={1}
      animateLeftToRight={animateLeftToRight}
      animateBottomToTop={animateBottomToTop}
      overlayTabbar={overlayTabbar}
    />
  );
};

const Header: Components['Header'] = ({ title }) => {
  const options = useOptions();

  return (
    <ion-header collapse={'condense'}>
      <ion-toolbar color={'transparent'}>
        <ion-title
          size={options.headerTitleSize}
          color={options?.headerTitleColor}
        >
          {title}
        </ion-title>
      </ion-toolbar>
    </ion-header>
  );
};

const Scroller: Components['Scroller'] = React.forwardRef<{}, ScreenProps>(
  (
    { style, overlayTabbar, animateLeftToRight, animateBottomToTop, ...rest },
    ref
  ) => {
    const options = useOptions();
    const title = useScreenTitle(options.tabLabels[0]);

    if (animateLeftToRight || animateBottomToTop) {
      return (
        <AnimatedScreenWrapper
          overlayTabbar={overlayTabbar}
          animateLeftToRight={animateLeftToRight}
        >
          <ion-header collapse={'fade'} translucent>
            <ion-toolbar color={options.toolbarColor}>
              <ion-buttons slot='start'>
                <NextBackButton />
              </ion-buttons>
              {title && <ion-title>{title}</ion-title>}
              <ion-buttons slot={'end'}></ion-buttons>
            </ion-toolbar>
          </ion-header>
          <CustomIonContent
            ref={ref}
            style={style}
            options={options}
            title={title}
            {...rest}
          />
        </AnimatedScreenWrapper>
      );
    }
    console.log(title);
    return (
      <div className={'ion-page z-30 min-h-full min-w-full bg-slate-900'}>
        <ion-header collapse={'fade'} translucent>
          <ion-toolbar color={options.toolbarColor}>
            <ion-buttons slot='start'></ion-buttons>
            {title && <ion-title>{title}</ion-title>}
            <ion-buttons slot={'end'}></ion-buttons>
          </ion-toolbar>
        </ion-header>
        <CustomIonContent
          ref={ref}
          style={style}
          title={title}
          options={options}
          {...rest}
        />
      </div>
    );
  }
);

const CustomIonContent = React.forwardRef<any, any>(
  ({ children, style, options, title, ...rest }, ref) => {
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
      <>
        {/*<ion-header collapse={'fade'} translucent>*/}
        {/*  <ion-toolbar color={options.toolbarColor}>*/}
        {/*    {title && <ion-title>{title}</ion-title>}*/}
        {/*    <ion-buttons slot={'end'}></ion-buttons>*/}
        {/*  </ion-toolbar>*/}
        {/*</ion-header>*/}
        <ion-content fullscreen scroll-y={false}>
          {options.pullToRefresh && (
            <ion-refresher
              id='refresher'
              slot='fixed'
              pull-factor={0.5}
              pull-min={100}
              pull-max={200}
            >
              <ion-refresher-content></ion-refresher-content>
            </ion-refresher>
          )}
          <div ref={ref} style={style} {...rest}>
            <Header title={title} />
            <Block className='relative min-h-full pt-16'>
              {children}
              <BottomSafeSpace />
            </Block>
          </div>
        </ion-content>
      </>
    );
  }
);

const BottomSafeSpace = () => <div style={{ height: 50 }} />;
