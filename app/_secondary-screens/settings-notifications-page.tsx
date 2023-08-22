import {ViewTypes} from '@/utils';
import {View} from '@/components';

export async function SettingsNotificationsPage({screenId}) {
    return (
        <View
            animateLeftToRight
            screenId={screenId}
            screenType={ViewTypes.SECONDARY}
        >
            <div>SETTINGS</div>
        </View>
    );
}
