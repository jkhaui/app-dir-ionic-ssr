import { Modal } from '@/components/modal';
import { View } from '@/components';

import { TitleSizes, ViewTypes } from '@/utils';

const getContent = async () => {
  const res = await fetch(
    `https://content.guardianapis.com/football/2023/aug/05/thats-our-job-matildas-ready-to-step-up-if-denmark-match-goes-to-penalties?api-key=${process.env.GUARDIAN_API_KEY}&show-fields=all`
  );

  if (!res.ok) {
    throw new Error('Something went wrong');
  }
  return res.json();
};

export default async function Page(props) {
  const data = await getContent();
  const content = data?.response?.content?.fields?.bodyText;

  // return null;
  return (
    <View
      animateLeftToRight
      title={'Matildas ready to step up if Denmark goes to penalties'}
      headerTitleSize={TitleSizes.DEFAULT}
      bodyTitleSize={TitleSizes.DEFAULT}
    >
      <div className={'text-gray-300'}>{content}</div>
    </View>
  );
}
