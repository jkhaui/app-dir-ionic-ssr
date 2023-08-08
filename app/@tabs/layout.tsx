import { AnimatePresenceWrapper } from '@/components';

export default async function Layout(props) {
  return (
    <>
      <AnimatePresenceWrapper>{props.children}</AnimatePresenceWrapper>
      <AnimatePresenceWrapper>{props.modal}</AnimatePresenceWrapper>
      {props.tabs}
    </>
  );
}
