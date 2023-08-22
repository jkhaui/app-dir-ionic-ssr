'use client';

import * as React from 'react';
import {useIsDesktop, useUIPreferences} from '@/hooks';
import {LoaderSize, LoaderType, mapLoaderSizeToStyleObj} from '@/utils';

interface LoaderDefaultProps {
    size?: LoaderSize;
    loaderType?: LoaderType;
}

export const LoaderDefault = ({
                                  size = LoaderSize.DEFAULT,
                                  loaderType = LoaderType.ICON_NATIVE,
                              }: LoaderDefaultProps) => {
    const isDesktop = useIsDesktop();

    const {CustomLoaderComponent} = useUIPreferences();

    if (loaderType === LoaderType.ICON_CUSTOM && !CustomLoaderComponent) {
        throw new Error(
            '`CustomLoaderComponent` is required when loaderType is set to ICON_CUSTOM'
        );
    }

    return isDesktop || loaderType === LoaderType.ICON_CUSTOM ? (
        CustomLoaderComponent
    ) : (
        <ion-spinner style={mapLoaderSizeToStyleObj(size)}></ion-spinner>
    );
};
