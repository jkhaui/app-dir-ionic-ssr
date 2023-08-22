import { HomePage } from '@/tab-screens';
import { ROOT_PATH } from '@/utils';

export default function Page({ params }, searchParams) {
  return <HomePage screenId={ROOT_PATH} searchParams={searchParams} />;
}
