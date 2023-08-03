'use client';

import * as React from 'react';
import { KonstaProvider } from 'konsta/react';
import { TITLE } from '@/app/constants';
import { AnimatePresence } from 'framer-motion';
import { TabNavBar } from '@/components/tab-nav-bar';
import {
  GearIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { useIonicLoader } from '@/hooks';

const Defaults = {
  THEME: 'ios',
  SPLIT_PANE_CONTENT_ID: 'main',
  SPLIT_PANE_BREAKPOINT: 'lg',
  TOOLBAR_COLOR: 'transparent',
  DARK: true,
  TOUCH_RIPPLE: false,
  ANIMATE_PRESENCE_MODE: 'wait',
  ANIMATE_PRESENCE_INITIAL: false,
};

export const ClientLayout = ({
  options,
  children,
  SplitPaneContentSlot = null,
  splitPaneLayout = true,
  showTabsOnDesktop = true,
  splitPaneProps = {},
  animatePresenceProps = {},
  tabLabels,
  tabIcons = [HomeIcon, PersonIcon, MagnifyingGlassIcon, GearIcon],
  tabbarProps = {},
}) => {
  useIonicLoader();

  const {
    when,
    contentId,
    title: sidePanelTitle,
    toolbarColor,
    fullscreenContent: sidePanelFullscreenContent,
    ...restSplitPaneProps
  } = splitPaneProps;
  const { mode, initial, ...restAnimatePresenceProps } = animatePresenceProps;
  const { labels, icons, ...restTabbarProps } = tabbarProps;

  const id = contentId || Defaults.SPLIT_PANE_CONTENT_ID;

  return (
    <KonstaProvider
      theme={options?.theme || Defaults.THEME}
      dark={options?.dark || Defaults.DARK}
      touchRipple={options?.touchRipple || Defaults.TOUCH_RIPPLE}
    >
      <ion-app>
        <ion-split-pane
          disabled={!splitPaneLayout}
          when={when || Defaults.SPLIT_PANE_BREAKPOINT}
          content-id={id}
        >
          <ion-menu content-id={id}>
            <ion-header>
              <ion-toolbar color={toolbarColor || Defaults.TOOLBAR_COLOR}>
                <ion-title>{sidePanelTitle}</ion-title>
              </ion-toolbar>
            </ion-header>
            <ion-content fullscreen={sidePanelFullscreenContent}>
              {SplitPaneContentSlot}
            </ion-content>
          </ion-menu>
          <div id={id} className={'md:min-h-full md:min-w-full'}>
            {/*<ion-router-outlet>{tabs}</ion-router-outlet>*/}
            <ion-header collapse={'fade'} translucent>
              <ion-toolbar color={Defaults.TOOLBAR_COLOR}>
                <ion-title>{TITLE}</ion-title>
              </ion-toolbar>
            </ion-header>
            <AnimatePresence
              mode={mode || Defaults.ANIMATE_PRESENCE_MODE}
              initial={initial || Defaults.ANIMATE_PRESENCE_INITIAL}
              {...restAnimatePresenceProps}
            >
              {children}
            </AnimatePresence>
            {showTabsOnDesktop && (
              <TabNavBar
                tabLabels={tabLabels}
                tabIcons={tabIcons}
                labels={labels}
                icons={icons}
                {...restTabbarProps}
              />
            )}
          </div>
        </ion-split-pane>
      </ion-app>
    </KonstaProvider>
  );
};
