'use client';

import * as React from 'react';
import UIPreferences from './ui-preferences-context';
import { isSSR, isSystemDarkMode } from '@/utils';

interface UIPreferencesProviderProps {
  children: React.ReactNode;
  primaryColor?: string;
  primaryFont?: string;
  CustomLoaderComponent?: React.ReactNode;
}

export const UIPreferencesProvider = ({
  children,
  primaryColor = '#05f7b3',
  primaryFont = '--ion-default-font',
  CustomLoaderComponent = null,
}: UIPreferencesProviderProps) => {
  const [brand, setBrand] = React.useState({ primaryColor, primaryFont });
  const [isDarkMode, setIsDarkMode] = React.useState(
    !isSSR && isSystemDarkMode()
  );

  React.useEffect(() => {
    if (!isSSR) {
      const runColorMode = (fn) => {
        if (!window.matchMedia) {
          return;
        }

        const query = window.matchMedia('(prefers-color-scheme: dark)');

        fn(query.matches);

        query.addEventListener('change', (event) => fn(event.matches));

        return () =>
          query.removeEventListener('change', (event) => fn(event.matches));
      };

      runColorMode((_isDarkMode) => {
        setIsDarkMode(_isDarkMode);
      });
    }
  }, []);

  const memoizedDarkModeObj = React.useMemo(
    () => ({
      isDarkMode,
      setIsDarkMode,
      CustomLoaderComponent,
    }),
    [isDarkMode, setIsDarkMode, CustomLoaderComponent]
  );

  return (
    <UIPreferences.Provider value={memoizedDarkModeObj}>
      {children}
    </UIPreferences.Provider>
  );
};
