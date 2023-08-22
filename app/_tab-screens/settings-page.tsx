import { MenuListBlock, View } from '@/components';
import { getScreenId, ViewTypes } from '@/utils';
import * as React from 'react';

export function SettingsPage({ screenId }) {
  return (
    <View screenId={screenId} screenType={ViewTypes.TAB}>
      <div className={'max-w-lg pt-6 text-gray-300'}>
        <MenuListBlock
          title={'Sections'}
          items={[
            {
              href: '/settings/account',
              title: 'Account',
            },
            {
              href: '/settings/privacy',
              title: 'Privacy',
            },
          ]}
        />
      </div>
    </View>
  );
}
