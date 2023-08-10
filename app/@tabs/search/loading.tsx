import { DefaultLoadingSkeleton, LoadingScreen } from '@/components';

export default function Loading() {
  return (
    <LoadingScreen className={'max-w-lg pt-16'} center={false}>
      <DefaultLoadingSkeleton count={8} />
    </LoadingScreen>
  );
}
