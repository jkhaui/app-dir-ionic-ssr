'use client';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { useInAppNavigation } from '@/hooks';

interface InAppLinkProps extends LinkProps {
  handleClickBeforeTransition?: boolean;
  children?: JSX.Element;
  clearNavigationStack?: boolean;
}

export const InAppLink = ({
  href,
  onClick,
  handleClickBeforeTransition,
  clearNavigationStack,
  ...rest
}: InAppLinkProps) => {
  const router = useRouter();

  const { updateInAppNavigation } = useInAppNavigation();

  const handleClick = (e) => {
    if (onClick) {
      handleClickBeforeTransition && onClick(e);
    }

    if (onClick) {
      !handleClickBeforeTransition && onClick(e);
    }
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
};
