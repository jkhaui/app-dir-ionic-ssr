'use client';

import * as React from 'react';
import { KonstaProvider } from 'konsta/react';
import { AnimatePresence } from 'framer-motion';
import { TabNavBar } from '@/components/tab-nav-bar';
import {
  GearIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { useIonicLoader } from '@/hooks';
import { OptionsProvider } from '@/contexts/options-provider';

interface Options {
  theme: 'ios' | 'material';
  dark?: boolean;
  touchRipple?: boolean;
  splitPaneLayoutDisabled?: boolean;
  splitPaneContentId?: string;
  splitPaneBreakpoint?: string | number | boolean;
  showTabsOnDesktop?: boolean;
  pullToRefresh?: boolean;
  animatePresenceMode?: string;
  animatePresenceInitial?: boolean;
  toolbarColor?: string;
}

const defaultOptions = {
  theme: 'ios',
  splitPaneContentId: 'main',
  splitPaneBreakpoint: 'lg',
  toolbarColor: 'transparent',
  dark: false,
  touchRipple: false,
  animatePresenceMode: 'wait',
  animatePresenceInitial: false,
  pullToRefresh: true,
  showTabsOnDesktop: true,
  splitPaneLayoutDisabled: false,
};

export const ClientLayout = ({
  options,
  children,
  headerTitle = null,
  SplitPaneContentSlot = null,
  splitPaneProps = {},
  animatePresenceProps = {},
  tabLabels,
  tabIcons = [HomeIcon, PersonIcon, MagnifyingGlassIcon, GearIcon],
  tabbarProps = {},
}) => {
  useIonicLoader();

  const mergedOptions = { ...defaultOptions, ...options, headerTitle };

  const {
    when,
    contentId,
    title: sidePanelTitle,
    toolbarColor,
    fullscreenContent: sidePanelFullscreenContent,
    ...splitPaneRestProps
  } = splitPaneProps;
  const { mode, initial, ...animatePresenceRestProps } = animatePresenceProps;
  const { labels, icons, ...tabbarRestProps } = tabbarProps;

  const id = contentId || defaultOptions.splitPaneContentId;

  return (
    <OptionsProvider options={mergedOptions}>
      <KonstaProvider
        theme={options?.theme || defaultOptions.theme}
        dark={options?.dark ?? defaultOptions.dark}
        touchRipple={options?.touchRipple ?? defaultOptions.touchRipple}
      >
        <ion-app>
          <ion-split-pane
            disabled={mergedOptions.splitPaneLayoutDisabled}
            when={when ?? mergedOptions.splitPaneBreakpoint}
            content-id={id}
          >
            <ion-menu content-id={id}>
              <ion-header>
                <ion-toolbar color={toolbarColor || mergedOptions.toolbarColor}>
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
                <ion-toolbar color={mergedOptions.toolbarColor}>
                  {headerTitle && <ion-title>{headerTitle}</ion-title>}
                </ion-toolbar>
              </ion-header>
              <AnimatePresence
                mode={mode ?? mergedOptions.animatePresenceMode}
                initial={initial ?? mergedOptions.animatePresenceInitial}
                {...animatePresenceRestProps}
              >
                {children}
              </AnimatePresence>
              {mergedOptions.showTabsOnDesktop && (
                <TabNavBar
                  tabLabels={tabLabels}
                  tabIcons={tabIcons}
                  labels={labels}
                  icons={icons}
                  {...tabbarRestProps}
                />
              )}
            </div>
          </ion-split-pane>
        </ion-app>
      </KonstaProvider>
    </OptionsProvider>
  );
};
