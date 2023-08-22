// export default async function Post(props) {
//   console.log('root', props);
//   return null;
//   // return <Modal />;
// }

import {InAppLink} from '@/components/in-app-link';
import {View} from '@/components';
import {TitleSizes, ViewTypes} from '@/utils';
import * as React from 'react';

const getContent = async () => {
    const res = await fetch(
        `https://content.guardianapis.com/football/2023/aug/05/thats-our-job-matildas-ready-to-step-up-if-denmark-match-goes-to-penalties?api-key=${process.env.GUARDIAN_API_KEY}&show-fields=all`
    );

    if (!res.ok) {
        throw new Error('Something went wrong');
    }
    return res.json();
};

export async function PostsPage({screenId}: { screenId: string }) {
    const data = await getContent();

    let _title = data?.response?.content?.id;
    _title = _title?.split('/');
    _title = _title[_title.length - 1];
    console.log(data?.response?.content);
    // const { updateCurrentTitle } = useInAppNavigation();
    // updateCurrentTitle('Matildas ready to step up if Denmark goes to penalties');
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
            <div>
                Click <InAppLink href={`/search/post/${_title}`}>here</InAppLink> to
                view a post.
            </div>
        </View>
    );
}

// 'use client';
//
// import { InAppLink } from '@/components/in-app-link';
// import { Block } from 'konsta/react';
// import * as React from 'react';
//
// export default function Default() {
//   return (
//     <Block>
//       Click <InAppLink href='/search/post/abc-222987'>here</InAppLink> to view a
//       post.
//     </Block>
//   );
// }
//
// // 'use client';
// //
// // import { Block } from 'konsta/react';
// // import { InAppLink } from '@/components/in-app-link';
// // import * as React from 'react';
// // import { Views } from '@/utils';
// //
// // export default function Default() {
// //     return (
// //         <View screenType={Views.SECONDARY}>
// //             <Block>
// //                 Click <InAppLink href='/search/post/abc-222'>here</InAppLink> to view a
// //                 post.
// //             </Block>
// //         </View>
// //     );
// // }
