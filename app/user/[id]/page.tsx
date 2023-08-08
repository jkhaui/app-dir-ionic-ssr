'use client';

import { motion } from 'framer-motion';

export default function Page() {
  return (
    <motion.div
      className={'ion-page z-40 min-h-full min-w-full bg-slate-900'}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      <div>User Page</div>
    </motion.div>
  );
}
