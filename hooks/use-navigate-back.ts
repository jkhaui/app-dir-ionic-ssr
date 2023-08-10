'use client';

import { useRouter } from 'next/navigation';
import { useInAppNavigation } from './use-in-app-navigation';
import { NavigationOps } from '@/context-providers';

export const useNavigateBack = () => {
  const router = useRouter();
  const { updateInAppNavigation } = useInAppNavigation();

  return () => {
    router.back();

    updateInAppNavigation(NavigationOps.POP_NON_TAB_ROUTE);
  };
};
