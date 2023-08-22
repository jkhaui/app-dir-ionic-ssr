import * as React from 'react';
import { SegmentTabsVariants } from '@/utils';

type SegmentTab = {
  label: string;
  value: string;
};

interface SegmentTabsProps {
  scrollable?: boolean;
  value: string;
  tabs: SegmentTab[];
  activeSegment: string;
  handleActiveSegment: (value: string) => void;
}

export const SegmentTabs = ({
  scrollable = true,
  tabs,
  activeSegment,
  handleActiveSegment,
}: SegmentTabsProps) => {
  return (
    <ion-segment
      value={activeSegment}
      selectOnFocus
      swipeGesture
      scrollable={scrollable}
    >
      {tabs.map(({ label, value }) => (
        <ion-segment-button
          key={value}
          value={value}
          onClick={() => {
            handleActiveSegment(value);
          }}
        >
          <ion-label>{label}</ion-label>
        </ion-segment-button>
      ))}
    </ion-segment>
  );
};
