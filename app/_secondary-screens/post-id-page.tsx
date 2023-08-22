// 'use client';

import * as React from 'react';
// export default async function Post(props) {
//   console.log('root', props);
//   return null;
//   // return <Modal />;
// }
import {TitleSizes} from '@/utils';
import {View} from '@/components';

const getContent = async () => {
    const res = await fetch(
        `https://content.guardianapis.com/football/2023/aug/05/thats-our-job-matildas-ready-to-step-up-if-denmark-match-goes-to-penalties?api-key=${process.env.GUARDIAN_API_KEY}&show-fields=all`
    );

    if (!res.ok) {
        throw new Error('Something went wrong');
    }
    return res.json();
};

export async function PostIdPage({screenId}: { screenId: string }) {
    const data = await getContent();
    const bodyContent = data?.response?.content?.fields?.bodyText;

    return (
        <View
            screenId={screenId}
            animateLeftToRight
            // animateBottomToTop={isSecondaryView}
            // animateLeftToRight={!isSecondaryView}
            overlayTabbar={false}
            headerTitleSize={TitleSizes.LARGE}
            bodyTitleSize={TitleSizes.LARGE}
        >
            <div className={'text-gray-300'}>{bodyContent}</div>
        </View>
    );
}
