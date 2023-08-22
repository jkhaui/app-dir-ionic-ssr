'use client';

import { Block, Navbar, Popup } from 'konsta/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NextBackButton } from '@/components';
import { useNavigateBack } from '@/hooks';

export const Modal = ({ children }) => {
  const handleNavigateBack = useNavigateBack();

  return (
    <motion.div
      className={'ion-page z-50'}
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 200, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      <Popup
        opened
        colors={{
          bg: 'bg-slate-900',
        }}
        // size={'h-5/6'}
        onBackdropClick={() => {}}
      >
        <>
          <Navbar
            title='Popup'
            right={
              <Link
                href={'#'}
                onClick={() => {
                  handleNavigateBack();
                }}
              >
                Close
              </Link>
            }
            left={<NextBackButton />}
          />
          <Block>{children}</Block>
        </>
      </Popup>
    </motion.div>
  );
};
