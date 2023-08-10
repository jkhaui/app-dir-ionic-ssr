import { Capacitor } from '@capacitor/core';

export const useIsNativePlatform = () => {
  return Capacitor.isNativePlatform();
};
