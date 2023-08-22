import { mapTabRoutesToView } from '@/tab-routes-config';

export default async function Page({ params }) {
  return mapTabRoutesToView(params);
}
