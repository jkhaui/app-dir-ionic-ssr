'use client';

import * as React from 'react';
import Skeleton from 'react-loading-skeleton';
import { SkeletonWrapper } from './skeleton-wrapper';
import { LoaderDefault } from '@/components';
import {LoaderSize, LoaderType} from '@/utils';

export interface DefaultLoadingSkeletonProps {
  height?: number;
  count?: number;
  showProgressBar?: boolean;
  loaderType?: LoaderType;
}

export const DefaultLoadingSkeleton = ({
  count,
  height,
  showProgressBar = true,
  loaderType = LoaderType.SKELETON,
}: DefaultLoadingSkeletonProps) => {
  if (height && count && count > 1) {
    throw new Error('Only one of `height` or `count` should be specified.');
  }

  return (
    <>
      {showProgressBar && (
        <ion-progress-bar type='indeterminate'></ion-progress-bar>
      )}
      {loaderType === LoaderType.SKELETON ? (
        <div className={'max-w-lg pt-16'}>
          <div className={'h-full w-full'}>
            <Skeleton className={'h-12'} wrapper={SkeletonWrapper} />
            <div className={'h-10'} />
            <Skeleton
              count={(!height && count) || 1}
              className={(height && `h-${height}`) || undefined}
            />
          </div>
        </div>
      ) : (
        <div className={'flex h-full w-full items-center justify-center'}>
          <LoaderDefault size={LoaderSize.DEFAULT} loaderType={loaderType} />
        </div>
      )}
    </>
  );
};
