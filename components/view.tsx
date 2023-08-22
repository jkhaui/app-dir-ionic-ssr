'use client';

import * as React from 'react';
import type { Components } from 'react-virtuoso';
import { Virtuoso } from 'react-virtuoso';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
import { motion } from 'framer-motion';
import { useInAppNavigation, useIsMobileDevice, useOptions } from '@/hooks';
import { NextBackButton } from '@/components/next-back-button';
import { NavigationOps } from '@/context-providers';
import { StackingContext, TitleSizes, ViewTypes } from '@/utils';
import { usePathname } from 'next/navigation';
import { AnimatePresenceWrapper } from '@/components/animate-presence-wrapper';

interface ViewProps extends AnimatedViewWrapperProps {
  animateLeftToRight?: boolean;
  animateBottomToTop?: boolean;
  options: any;
  inAppNavigation: any;
}

interface AnimatedViewWrapperProps extends React.HTMLProps<any> {
  screenId: string;
  overlayTabbar: boolean;
  secondaryScreen?: boolean;
  tertiaryView?: boolean;
  screenType: ViewTypes;
  animateLeftToRight?: boolean;
  tabMetadata: any;
  children: React.ReactNode;
  pullToRefreshOptions: any;
}

type PullToRefreshOptions = {
  enabled: boolean;
};

export const getTitleSize = (bodyTitleSize?: string, options?: any) =>
  !bodyTitleSize
    ? options.headerTitleSize
    : bodyTitleSize === TitleSizes.DEFAULT
    ? undefined
    : bodyTitleSize;

const AnimatedViewWrapper = ({
  overlayTabbar,
  animateLeftToRight,
  children,
  currentViewType,
  screenType,
  screenId,
}: AnimatedViewWrapperProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresenceWrapper>
      {pathname === screenId && (
        <motion.div
          key={screenId}
          className={`ion-page ${
            overlayTabbar
              ? StackingContext.ELEVATION_HIGHER
              : StackingContext.ELEVATION_MID
          } min-h-full max-w-full bg-transparent`}
          initial={{ [animateLeftToRight ? 'x' : 'y']: 200, opacity: 0 }}
          animate={{ [animateLeftToRight ? 'x' : 'y']: 0, opacity: 1 }}
          exit={{ [animateLeftToRight ? 'x' : 'y']: 200, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 30,
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresenceWrapper>
  );
};

export const View = ({
  children,
  overlayTabbar = false,
  animateLeftToRight,
  animateBottomToTop,
  popup = false,
  secondaryScreen,
  tertiaryView,
  screenType,
  title,
  screenId,
  NavBarEndSlot = null,
  headerTitleSize,
  bodyTitleSize,
  initialItemCount = 1,
  totalItemCount = 1,
  showNavBar = true,
  SecondaryNavBarSlot = null,
  pullToRefreshOptions = {},
}: ViewProps) => {
  const virtuosoRef = React.useRef(null);

  const options = useOptions();

  const {
    updateInAppNavigation,
    inAppNavigation: { scrollToTop, tabMetadata },
    currentTitle,
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

  if (!screenType) {
    throw new Error('A valid value for `screenType` is required.');
  }
  console.log(screenId);
  return (
    <Virtuoso
      ref={virtuosoRef}
      onScroll={(e) => console.log(e.target.scrollTop)}
      components={{ Scroller }}
      className={`ion-content-scroll-host min-h-full px-6 ${
        options.theme === 'ios' ? 'pt-16' : 'pt-0'
      } my-0 max-w-full text-gray-100`}
      initialItemCount={initialItemCount}
      itemContent={() => children}
      totalCount={totalItemCount}
      screenId={screenId}
      animateLeftToRight={animateLeftToRight}
      animateBottomToTop={animateBottomToTop}
      overlayTabbar={overlayTabbar}
      tabMetadata={tabMetadata}
      popup={popup}
      secondaryScreen={secondaryScreen}
      tertiaryView={tertiaryView}
      screenType={screenType}
      title={currentTitle}
      NavBarEndSlot={NavBarEndSlot}
      headerTitleSize={headerTitleSize}
      bodyTitleSize={bodyTitleSize}
      options={options}
      SecondaryNavBarSlot={SecondaryNavBarSlot}
      showNavBar={showNavBar}
    />
  );
};

const Scroller: Components['Scroller'] = React.forwardRef<{}, ViewProps>(
  (
    {
      style,
      overlayTabbar,
      tabMetadata,
      screenId,
      animateLeftToRight,
      animateBottomToTop,
      popup,
      NavBarEndSlot,
      secondaryScreen,
      tertiaryView,
      screenType,
      title,
      headerTitleSize,
      bodyTitleSize,
      options,
      showNavBar,
      SecondaryNavBarSlot,
      ...rest
    },
    ref
  ) => {
    const screenTitle = title;

    const pathname = usePathname();
    const getCurrentViewType = (currentPathLength: number) => {
      switch (currentPathLength) {
        case 2:
          return ViewTypes.TAB;
        case 3:
          return ViewTypes.SECONDARY;
        default:
          return ViewTypes.TAB;
      }
    };

    const pathnamePartsLength = pathname.split('/').length;
    // TODO: modify this logic so secondary views which aren't tab routes
    // can have non-nested paths
    const isCurrentViewTabRoute =
      (screenType !== ViewTypes.SECONDARY && screenType !== ViewTypes.POPUP) ||
      pathnamePartsLength === 2;

    const currentViewType =
      screenType || getCurrentViewType(pathnamePartsLength);

    if (animateLeftToRight || animateBottomToTop) {
      return (
        <AnimatedViewWrapper
          overlayTabbar={overlayTabbar}
          screenId={screenId}
          animateLeftToRight={animateLeftToRight}
          tabMetadata={tabMetadata}
          currentViewType={currentViewType}
          screenType={screenType}
        >
          {showNavBar && (
            <ion-header collapse={'fade'} translucent>
              <ion-toolbar color={options.toolbarColor}>
                <ion-buttons slot='start'>
                  <NextBackButton />
                </ion-buttons>
                {screenTitle && (
                  <ion-title size={getTitleSize(headerTitleSize, options)}>
                    {screenTitle}
                  </ion-title>
                )}
                <ion-buttons slot={'end'}></ion-buttons>
              </ion-toolbar>
              {SecondaryNavBarSlot && (
                <ion-toolbar color={options.toolbarColor}>
                  {SecondaryNavBarSlot}
                </ion-toolbar>
              )}
            </ion-header>
          )}
          <CustomIonContent
            ref={ref}
            style={style}
            options={options}
            screenTitle={screenTitle}
            bodyTitleSize={bodyTitleSize}
            {...rest}
          />
        </AnimatedViewWrapper>
      );
    }
    console.log(`isCurrentViewTabRoute: ${isCurrentViewTabRoute}`);
    return (
      <div
        className={`ion-page ${
          StackingContext.ELEVATION_LOW
        } min-h-full min-w-full ${popup ? 'bg-transparent' : ''} ${
          !isCurrentViewTabRoute ? 'invisible' : 'visible'
        }`}
      >
        {showNavBar && (
          <ion-header class={'ion-no-border'} collapse={'fade'} translucent>
            <ion-toolbar color={options.toolbarColor}>
              <ion-buttons slot='start'></ion-buttons>
              {screenTitle && (
                <ion-title size={headerTitleSize}>{screenTitle}</ion-title>
              )}
              <ion-buttons slot={'end'}>{NavBarEndSlot}</ion-buttons>
            </ion-toolbar>
            {SecondaryNavBarSlot && (
              <ion-toolbar color={options.toolbarColor}>
                {SecondaryNavBarSlot}
              </ion-toolbar>
            )}
          </ion-header>
        )}
        <CustomIonContent
          ref={ref}
          style={style}
          screenTitle={screenTitle}
          bodyTitleSize={bodyTitleSize}
          options={options}
          {...rest}
        />
      </div>
    );
  }
);

const CustomIonContent = React.forwardRef<any, any>(
  ({ children, style, options, screenTitle, bodyTitleSize, ...rest }, ref) => {
    const [initialize] = useOverlayScrollbars({
      options: {
        update: {
          debounce: null,
        },
        showNativeOverlaidScrollbars: false,
        overflow: {
          x: 'hidden',
          y: 'visible-scroll',
        },
        scrollbars: {
          theme: 'os-theme-dark',
          clickScroll: true,
          visibility: 'visible',
          autoHide: 'leave',
          autoHideDelay: 500,
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

    const isMobileDevice = useIsMobileDevice();

    return (
      <ion-content fullscreen scroll-y={false}>
        {options.pullToRefresh && isMobileDevice && (
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
        <div
          ref={ref}
          data-overlayscrollbars-initialize
          style={style}
          {...rest}
        >
          <BodyHeader screenTitle={screenTitle} bodyTitleSize={bodyTitleSize} />
          <div
            className={
              'relative z-10 m-0 min-h-full max-w-full pt-6 text-sm text-gray-300'
            }
          >
            {children}
          </div>
        </div>
      </ion-content>
    );
  }
);

const BodyHeader: Components['Header'] = ({ screenTitle, bodyTitleSize }) => {
  const options = useOptions();

  return (
    <ion-header collapse={'condense'}>
      <ion-toolbar color={'transparent'}>
        <ion-title
          size={getTitleSize(bodyTitleSize, options)}
          color={options.headerTitleColor}
        >
          {screenTitle}
        </ion-title>
      </ion-toolbar>
    </ion-header>
  );
};
