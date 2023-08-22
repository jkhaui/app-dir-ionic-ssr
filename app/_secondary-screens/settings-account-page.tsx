'use client';

import {TitleSizes, ViewTypes} from '@/utils';
import {List, ListItem} from 'konsta/react';
import {InAppLink} from '@/components/in-app-link';
import {View} from '@/components';

export function SettingsAccountPage({screenId}) {
    return (
        <View
            screenId={screenId}
            animateLeftToRight
            // animateBottomToTop={isSecondaryView && !fromTabLink}
            // animateLeftToRight={!isSecondaryView && !fromTabLink}
            overlayTabbar={false}
            headerTitleSize={TitleSizes.LARGE}
            bodyTitleSize={TitleSizes.LARGE}
            screenType={ViewTypes.SECONDARY}
        >
            <div className={'max-w-lg text-zinc-200'}>
                <List>
                    <ListItem
                        href={'/settings/account/notifications'}
                        linkComponent={InAppLink}
                        title={'Notifications'}
                    />
                </List>
            </div>
        </View>
    );
}
