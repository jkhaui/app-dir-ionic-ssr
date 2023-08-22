'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { INTERCEPTING_ROUTE_ROOT_PATTERN_MATCH } from '@/utils';

export const useSegmentAsRoute = () => {
  const segment = useSelectedLayoutSegment();

  if (segment?.includes(INTERCEPTING_ROUTE_ROOT_PATTERN_MATCH)) {
    return `/${segment.replace(INTERCEPTING_ROUTE_ROOT_PATTERN_MATCH, '')}`;
  }

  return `/${segment ?? ''}`;
};
