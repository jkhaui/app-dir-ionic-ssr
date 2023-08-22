import {
  DefaultLoadingSkeleton,
  DefaultLoadingSkeletonProps,
} from './default-loading-skeleton';

interface LoadingScreenProps extends DefaultLoadingSkeletonProps {
  children?: JSX.Element;
  className?: string;
  center?: boolean;
}

export function LoadingScreen({
  children,
  className,
  center = true,
  ...rest
}: LoadingScreenProps) {
  return (
    <div
      className={`${className || ''} flex h-full w-full ${
        center && children ? 'items-center justify-center' : ''
      }`}
    >
      {children ?? <DefaultLoadingSkeleton {...rest} />}
    </div>
  );
}
