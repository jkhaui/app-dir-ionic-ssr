'use client';

import { Screen } from '../screen';

export const NonTabSegmentTemplate = ({ children }) => {
  // const title = useScreenTitle();
  // console.log(title, 'title');
  return (
    <Screen animateBottomToTop overlayTabbar={false}>
      {children}
    </Screen>
  );
};
