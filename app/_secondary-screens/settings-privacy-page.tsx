import {TitleSizes, ViewTypes} from '@/utils';
import {View} from '@/components';

export async function SettingsPrivacyPage({screenId}) {
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
            <div>test</div>
        </View>
    );
}
