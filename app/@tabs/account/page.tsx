import { Screen } from '@/components';
import Link from 'next/link';

export default async function Page() {
  return (
    <Screen>
      <div>
        <h1>Account Page</h1>
      </div>
      <div className={'pt-6 text-gray-300'}>
        <div>
          Click <Link href='/post/abc-11123'>here</Link> to view a post.
        </div>
        <div>
          Click <Link href='/user/abc-11123'>here</Link> to view a user.
        </div>
      </div>
    </Screen>
  );
}
