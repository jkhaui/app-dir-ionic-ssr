import { LoadingScreen } from '@/components';
import { LoaderType } from '@/utils';

export default function Loading() {
  return <LoadingScreen loaderType={LoaderType.ICON_CUSTOM} />;
}
