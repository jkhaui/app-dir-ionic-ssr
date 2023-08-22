'use client';

import * as React from 'react';
import {mapSecondaryRoutesToView} from '@/secondary-routes-config';
import {useInAppNavigation} from "@/hooks";
import {getScreenId} from "@/utils";

export default function Page({params}) {
    console.log('CLIENT')
    const {inAppNavigation: {activeTab, tabMetadata}} = useInAppNavigation()

  const routeHistory = tabMetadata.get(activeTab)
// console.log(`Route History: ${JSON.stringify(routeHistory)}`)
//     if (routeHistory.length === 1){
//         return mapSecondaryRoutesToView(getScreenId(params))
//     }
//

    const splicedHistory = routeHistory.toSpliced(0, 1)
    return splicedHistory.map(({screenId}) => <React.Fragment
        key={screenId}>{mapSecondaryRoutesToView(screenId)}</React.Fragment>)
}
