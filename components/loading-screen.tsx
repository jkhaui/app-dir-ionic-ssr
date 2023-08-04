import { LoaderDefault } from '@/components/loader-default';

export function LoadingScreen() {
  return (
    <div className={'flex h-full w-full items-center justify-center'}>
      <LoaderDefault size={160} />
    </div>
  );
}
