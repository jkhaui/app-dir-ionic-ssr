'use client';

// import { promises as fs } from 'fs';
import * as React from 'react';
import {TitleSizes, ViewTypes} from '@/utils';
import {View} from '@/components';

export function NotificationsPage(props) {
    return (
        <View
            screenId={props.screenId}
            animateBottomToTop={true}
            // animateBottomToTop={isSecondaryView && !fromTabLink}
            // animateLeftToRight={!isSecondaryView && !fromTabLink}
            overlayTabbar
            headerTitleSize={TitleSizes.DEFAULT}
            bodyTitleSize={TitleSizes.LARGE}
            screenType={ViewTypes.SECONDARY}
        >
            <div className={'max-w-lg text-zinc-200'}>test</div>
        </View>
    );
}
