import { PageShell } from '@/components';

export default async function Page() {
  return (
    <PageShell>
      <div>
        <h1>Settings Page</h1>
      </div>
      <div className={'pt-6 text-gray-300'}>Some content</div>
    </PageShell>
  );
}
