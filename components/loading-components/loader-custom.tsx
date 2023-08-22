'use client';

import { useLottie } from 'lottie-react';
import animationData from '@/public/loading-animation.json';

export const LoaderCustom = ({ size }) => {
  const { View } = useLottie(
    {
      animationData,
      autoplay: true,
      loop: true,
    },
    {
      height: 'auto',
      width: 160,
    }
  );

  return View;
};
