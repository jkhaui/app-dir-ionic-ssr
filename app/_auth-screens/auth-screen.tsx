'use client';

import * as React from 'react';
import { getScreenId, TitleSizes, ViewTypes } from '@/utils';
import { View } from '@/components';

export function AuthScreen(props) {
  return (
    <View
      screenId={props.screenId}
      animateBottomToTop={true}
      overlayTabbar
      headerTitleSize={TitleSizes.DEFAULT}
      bodyTitleSize={TitleSizes.LARGE}
      screenType={ViewTypes.SECONDARY}
    >
      <div className={'max-w-lg text-zinc-200'}>test</div>
    </View>
  );
}
