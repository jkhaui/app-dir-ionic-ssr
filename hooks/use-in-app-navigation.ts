import * as React from 'react';
import { InAppNavigationContext } from '@/context-providers';

export const useInAppNavigation = () => {
  return React.useContext(InAppNavigationContext);
};
