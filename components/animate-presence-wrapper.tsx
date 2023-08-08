'use client';

import { AnimatePresence } from 'framer-motion';
import { useOptions } from '@/hooks';

export const AnimatePresenceWrapper = ({ children }) => {
  const options = useOptions();

  return (
    <AnimatePresence
      mode={options.animatePresenceMode}
      initial={options.animatePresenceInitial}
    >
      {children}
    </AnimatePresence>
  );
};
