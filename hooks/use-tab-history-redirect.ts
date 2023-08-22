'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useInAppNavigation } from '@/hooks/use-in-app-navigation';

export const useTabHistoryRedirect = () => {
  // const router = useRouter();
  // const {
  //   inAppNavigation: { activeTab, tabMetadata },
  // } = useInAppNavigation();
  //
  // return React.useEffect(() => {
  //   const currentTabHistory = tabMetadata.get(activeTab);
  //   const historyExists = currentTabHistory.length > 0;
  //
  //   if (historyExists) {
  //     router.push(currentTabHistory[currentTabHistory.length - 1]);
  //   }
  // }, [activeTab, router, tabMetadata]);
  return null;
};
