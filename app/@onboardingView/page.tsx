'use client';

import { useIsMobileDevice } from '@/hooks';
import { AuthScreen } from '@/app/_auth-screens/auth-screen';
import { getScreenId } from '@/utils';

export default function Page({ params }) {
  const isMobile = useIsMobileDevice();

  const screenId = getScreenId(params);

  return isMobile ? (
    <AuthScreen screenId={'/'} />
  ) : (
    <AuthScreen screenId={screenId} />
  );
}
