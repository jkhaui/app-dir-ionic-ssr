'use client';

import * as React from 'react';
import { KonstaProvider } from 'konsta/react';
import { TabNavBar } from './tab-nav-bar';
import {
  DotsHorizontalIcon,
  GearIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { useInjectPwaStyles, useIonicLoader, useIsMobileDevice } from '@/hooks';
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
  ROOT_PATH,
  TitleSizes,
} from '@/utils';
import useLocalStorageState from 'use-local-storage-state';
import { SplashScreen } from '@/components/splash-screen';
import { LoaderCustom } from '@/components/loading-components/loader-custom';
import { enableMapSet } from 'immer';
import { useDrag } from '@use-gesture/react';

interface Options {
  theme: PlatformThemeOrMode;
  primaryColor?: string;
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
  inferTitleFromPathname?: number | boolean;
  // showSidebar?: boolean;
}

type PwaHelperOptions = {
  iosBodyScrollLock: boolean;
  noTextSelection: boolean;
  noIosZoomOnFocus: boolean;
};

const defaultOptions = {
  theme: PlatformThemeOrMode.IOS,
  primaryColor: '#05f7b3',
  splitPaneContentId: 'main',
  splitPaneBreakpoint: 'lg',
  toolbarColor: 'transparent',
  dark: false,
  touchRipple: false,
  animatePresenceMode: 'wait',
  animatePresenceInitial: true,
  pullToRefresh: true,
  showTabsOnDesktop: true,
  splitPaneLayoutDisabled: false,
  headerTitleSize: TitleSizes.LARGE,
  showSidebarIcons: true,
  showTabbarIcons: true,
  showTabbarLabels: true,
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
  // showSidebar:true
};

export const AppRoot = ({
  options,
  children,
  headerTitle = null,
  SplitPaneContentSlot = null,
  splitPaneProps = {},
  animatePresenceProps = {},
  NavLogoComponent = null,
  tabLabels,
  tabIcons = [
    HomeIcon,
    MagnifyingGlassIcon,
    PersonIcon,
    GearIcon,
    DotsHorizontalIcon,
  ],
  tabbarProps = {},
}) => {
  enableMapSet();

  const sharedOptions = Object.freeze({
    ...defaultOptions,
    ...options,
    headerTitle,
    tabLabels,
  });

  const [theme, setTheme] = useLocalStorageState(
    LOCAL_STORAGE_KEY_DEFAULT_THEME,
    {
      defaultValue: getPlatformThemeOrMode(sharedOptions.theme),
    }
  );

  useIonicLoader(
    {
      mode: theme,
    },
    sharedOptions,
    setTheme
  );
  useInjectPwaStyles(true);

  const isMobileDevice = useIsMobileDevice();
  const [dragState, setDragState] = React.useState();
  const bind = useDrag((state) => setDragState(state));
  console.log(dragState, 'dragState');
  const {
    when,
    contentId,
    title: sidePanelTitle,
    toolbarColor,
    fullscreenContent: sidePanelFullscreenContent,
    ...splitPaneRestProps
  } = splitPaneProps;
  const { mode, initial, ...animatePresenceRestProps } = animatePresenceProps;
  const { showTabbarLabels, showTabbarIcons, ...tabbarRestProps } = tabbarProps;

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
                            href={ROOT_PATH}
                          >
                            {NavLogoComponent}
                          </InAppLink>
                        </ion-buttons>
                        <ion-title>{sidePanelTitle}</ion-title>
                      </ion-toolbar>
                    </ion-header>
                    <ion-content fullscreen={sidePanelFullscreenContent}>
                      <SideNavBar
                        tabLabels={tabLabels}
                        tabIcons={tabIcons}
                        showSidebarIcons={sharedOptions.showSidebarIcons}
                      />
                    </ion-content>
                  </ion-menu>
                  <div id={id} className={'md:min-h-full md:min-w-full'}>
                    {/*<ion-router-outlet>{tabs}</ion-router-outlet>*/}
                    <div {...bind()}>{children}</div>
                    {isMobileDevice && (
                      <TabNavBar
                        tabLabels={tabLabels}
                        tabIcons={tabIcons}
                        labels={showTabbarLabels}
                        icons={showTabbarIcons}
                        tabbarProps={tabbarRestProps}
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
