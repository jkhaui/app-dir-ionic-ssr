'use client';

import * as React from 'react';
import { KonstaProvider } from 'konsta/react';
import { TabNavBar } from './tab-nav-bar';
import {
  GearIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { useIonicLoader } from '@/hooks';
import { IonColors } from '@/types';
import { InAppNavigationProvider, OptionsProvider } from '@/context-providers';

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
  headerTitleSize: 'large' | 'small' | undefined;
  headerTitleColor: IonColors;
  disablePwaHelper?: PwaHelperOptions;
  showBackButtonText?: boolean;
  backButtonText?: React.ReactNode | string;
}

type PwaHelperOptions = {
  iosBodyScrollLock: boolean;
  noTextSelection: boolean;
  noIosZoomOnFocus: boolean;
};
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
  headerTitleSize: 'large',
  showBackButtonText: true,
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
      <InAppNavigationProvider>
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
                  <ion-toolbar
                    color={toolbarColor || mergedOptions.toolbarColor}
                  >
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
                    <ion-buttons slot={'start'}></ion-buttons>
                    {headerTitle && <ion-title>{headerTitle}</ion-title>}
                    <ion-buttons slot={'end'}></ion-buttons>
                  </ion-toolbar>
                </ion-header>
                {children}
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
      </InAppNavigationProvider>
    </OptionsProvider>
  );
};
