import * as React from 'react';
import { DefaultLoadingSkeleton, LoadingScreen } from '@/components';

export default function Loading() {
  return (
    <LoadingScreen className={'flex flex-col'} center={false}>
      <DefaultLoadingSkeleton />
    </LoadingScreen>
  );
}
