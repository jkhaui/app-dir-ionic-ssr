'use client';

import Skeleton from 'react-loading-skeleton';
import { SkeletonWrapper } from './skeleton-wrapper';

interface DefaultLoadingSkeletonProps {
  height?: number;
  count?: number;
}

export const DefaultLoadingSkeleton = ({
  count,
  height,
}: DefaultLoadingSkeletonProps) => {
  if (height && count && count > 1) {
    throw new Error('Only one of `height` or `count` should be specified.');
  }

  return (
    <div className={'h-full w-full'}>
      <Skeleton className={'h-12'} wrapper={SkeletonWrapper} />
      <div className={'h-10'} />
      <Skeleton
        count={(!height && count) || 1}
        className={(height && `h-${height}`) || undefined}
      />
    </div>
  );
};
