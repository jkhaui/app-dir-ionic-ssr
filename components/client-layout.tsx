'use client';

import { KonstaProvider } from 'konsta/react';
import { TITLE } from '@/app/constants';
import { AnimatePresence } from 'framer-motion';
import { TabNavBar } from '@/components/tab-nav-bar';
import * as React from 'react';
import {
  GearIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { useIonicLoader } from '@/hooks';

export const ClientLayout = ({
  // tabs,
  children,
  dark,
  touchRipple,
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

  const id = contentId || 'main';

  return (
    <KonstaProvider theme={'parent'} dark={dark} touchRipple={touchRipple}>
      <ion-app>
        <ion-split-pane
          disabled={!splitPaneLayout}
          when={when || 'lg'}
          content-id={id}
        >
          <ion-menu content-id={id}>
            <ion-header>
              <ion-toolbar color={toolbarColor || 'transparent'}>
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
              <ion-toolbar color='transparent'>
                <ion-title>{TITLE}</ion-title>
              </ion-toolbar>
            </ion-header>
            <AnimatePresence
              mode={mode || 'wait'}
              initial={initial || false}
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
