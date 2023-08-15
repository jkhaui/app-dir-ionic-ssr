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
import { useIonicLoader, useIsMobileDevice } from '@/hooks';
import { IonColors } from '@/types';
import {
  InAppNavigationProvider,
  OptionsProvider,
  UIPreferencesProvider,
} from '@/context-providers';
import { SideNavBar } from './side-nav-bar';
import { InAppLink } from './in-app-link';
import {
  getPlatformThemeOrMode,
  LOCAL_STORAGE_KEY_DEFAULT_THEME,
  PlatformThemeOrMode,
  TitleSizes,
} from '@/utils';
import useLocalStorageState from 'use-local-storage-state';
import { SplashScreen } from '@/components/splash-screen';
import { LoaderCustom } from '@/components/loading-components/loader-custom';

interface Options {
  theme: PlatformThemeOrMode;
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
  headerTitleSize: TitleSizes;
  headerTitleColor: IonColors;
  disablePwaHelper?: PwaHelperOptions;
  showBackButtonText?: boolean;
  backButtonText?: React.ReactNode | string;
  basePath?: string;
}

type PwaHelperOptions = {
  iosBodyScrollLock: boolean;
  noTextSelection: boolean;
  noIosZoomOnFocus: boolean;
};

const defaultOptions = {
  theme: PlatformThemeOrMode.IOS,
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
  headerTitleSize: TitleSizes.LARGE,
  showBackButtonText: true,
  splashScreenProps: {
    enabled: true,
    duration: 1000,
    colors: { bg: 'bg-slate-900' },
    LogoComponent: (
      <img
        src={'/logo-no-background.png'}
        width={160}
        height={'auto'}
        alt={'splash screen'}
      />
    ),
  },
};

export const App = ({
  options,
  children,
  headerTitle = null,
  SplitPaneContentSlot = null,
  splitPaneProps = {},
  animatePresenceProps = {},
  NavLogoComponent = null,
  tabLabels,
  tabIcons = [HomeIcon, PersonIcon, MagnifyingGlassIcon, GearIcon],
  tabbarProps = {},
}) => {
  const sharedOptions = {
    ...defaultOptions,
    ...options,
    headerTitle,
    tabLabels,
  };

  const [theme] = useLocalStorageState(LOCAL_STORAGE_KEY_DEFAULT_THEME, {
    defaultValue: getPlatformThemeOrMode(sharedOptions.theme),
  });

  useIonicLoader({
    mode: theme,
  });

  const isMobileDevice = useIsMobileDevice();

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

  const { splashScreenProps } = sharedOptions;

  const id = contentId || defaultOptions.splitPaneContentId;

  return (
    <>
      {splashScreenProps.enabled && <SplashScreen {...splashScreenProps} />}
      <OptionsProvider options={sharedOptions}>
        <InAppNavigationProvider tabLabels={tabLabels}>
          <KonstaProvider
            theme={theme}
            dark={sharedOptions.dark}
            touchRipple={sharedOptions.touchRipple}
          >
            <UIPreferencesProvider CustomLoaderComponent={<LoaderCustom />}>
              <ion-app class={`k-${theme}`}>
                <ion-split-pane
                  class={'mx-auto max-w-4xl'}
                  disabled={sharedOptions.splitPaneLayoutDisabled}
                  when={when ?? sharedOptions.splitPaneBreakpoint}
                  content-id={id}
                >
                  <ion-menu content-id={id}>
                    <ion-header>
                      <ion-toolbar
                        color={toolbarColor || sharedOptions.toolbarColor}
                      >
                        <ion-buttons slot={'start'}>
                          <InAppLink
                            className={'mr-2-safe ml-2-safe'}
                            href={'/'}
                          >
                            {NavLogoComponent}
                          </InAppLink>
                        </ion-buttons>
                        <ion-title>{sidePanelTitle}</ion-title>
                      </ion-toolbar>
                    </ion-header>
                    <ion-content fullscreen={sidePanelFullscreenContent}>
                      <SideNavBar tabLabels={tabLabels} tabIcons={tabIcons} />
                    </ion-content>
                  </ion-menu>
                  <div id={id} className={'md:min-h-full md:min-w-full'}>
                    {/*<ion-router-outlet>{tabs}</ion-router-outlet>*/}
                    {children}
                    {isMobileDevice && (
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
            </UIPreferencesProvider>
          </KonstaProvider>
        </InAppNavigationProvider>
      </OptionsProvider>
    </>
  );
};
