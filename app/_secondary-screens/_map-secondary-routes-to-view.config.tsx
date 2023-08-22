import {
  NotificationsPage,
  PostIdPage,
  PostsPage,
  SettingsAccountPage,
  SettingsNotificationsPage,
  SettingsPrivacyPage,
} from '@/secondary-screens/index';
import {notFound} from 'next/navigation';

export const mapSecondaryRoutesToView = (screenId: string) => {
    const PATH_REGEX = /^[a-z0-9]+$/i;

    switch (screenId) {
        // case '/_/notifications':
        case '/':
            return null;
        case '/notifications':
            return <NotificationsPage screenId={screenId}/>;
        case '/settings/privacy':
            return <SettingsPrivacyPage screenId={screenId}/>;
        case '/settings/account/notifications':
            return <SettingsNotificationsPage screenId={screenId}/>;
        case '/settings/account':
            return <SettingsAccountPage screenId={screenId}/>;
        case '/discover/posts':
            return <PostsPage screenId={screenId}/>;
        // case '/profile':
        //   return <ProfilePage screenId={screenId} />;
        // case '/discover':
        //   return <DiscoverPage screenId={screenId} />;
        // case '/settings':
        //   return <SettingsPage screenId={screenId} />;
        // case '/more':
        //   return <MorePage screenId={screenId} />;
        // case '/':
        //   return <HomePage screenId={screenId} />;

        default:
            console.log(screenId, 'SECONDARY NOT FOUND');
            return notFound();

            const parts = screenId.split('/');

            if (
                PATH_REGEX.test(parts[parts.length - 1]) &&
                parts[parts?.length - 2] === 'posts'
            ) {
                return <PostIdPage screenId={screenId}/>;
            }

            return null;
    }
};
