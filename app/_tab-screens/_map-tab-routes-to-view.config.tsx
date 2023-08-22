import {
  MorePage,
  ProfilePage,
  DiscoverPage,
  SettingsPage,
  HomePage,
} from '@/tab-screens/index';
import { getScreenId, ViewTypes } from '@/utils';
import {
  NotificationsPage,
  SettingsPrivacyPage,
  SettingsAccountPage,
  SettingsNotificationsPage,
  PostIdPage,
  PostsPage,
} from '@/secondary-screens';
import { notFound } from 'next/navigation';

export const mapTabRoutesToView = (screenId:string) => {
  const PATH_REGEX = /^[a-z0-9]+$/i;
  console.log(screenId, screenId);
  switch (screenId) {
    case '/profile':
      return <ProfilePage screenId={screenId} />;
    case '/discover':
      return <DiscoverPage screenId={screenId} />;
    case '/settings':
      return <SettingsPage screenId={screenId} />;
    case '/more':
      return <MorePage screenId={screenId} />;
    case '/':
      return null
    case '/notifications':
      return (
        <NotificationsPage screenID={screenId} viewType={ViewTypes.SECONDARY} />
      );
    default:
      console.log(screenId, 'TAB NOT FOUND');
      return notFound();

      const parts = screenId.split('/');

      if (
        PATH_REGEX.test(parts[parts.length - 1]) &&
        parts[parts?.length - 2] === 'posts'
      ) {
        return <PostIdPage screenId={screenId} />;
      }

      return null;
  }
};
