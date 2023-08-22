'use client';

import * as React from 'react';
import useSessionStorageState from 'use-session-storage-state';
import { SESSION_STORAGE_KEY_SPLASH_SCREEN } from '@/utils';

interface SplashScreenProps {
  enabled: boolean;
  duration?: number;
  colors?: { bg?: string };
  LogoComponent?: React.ReactNode;
}

export const SplashScreen = ({
  enabled,
  duration,
  colors,
  LogoComponent = null,
}: SplashScreenProps) => {
  const [showSplashScreen, setShowSplashScreen] = useSessionStorageState(
    SESSION_STORAGE_KEY_SPLASH_SCREEN,
    {
      defaultValue: true,
    }
  );

  React.useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 1000);
  }, []);

  // if (isSSR || !showSplashScreen) return null;

  return (
    <>
      {showSplashScreen && (
        <div
          aria-label='Splash View'
          className={
            'fixed left-0 top-0 z-50 flex h-screen w-screen select-none items-center justify-center bg-slate-900'
          }
        >
          {LogoComponent}
        </div>
      )}
    </>
  );
};
