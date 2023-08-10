import { LoaderDefault } from './loader-default';

interface LoadingScreenProps {
  children?: JSX.Element;
  className?: string;
  center?: boolean;
}

export function LoadingScreen({
  children,
  className,
  center = true,
}: LoadingScreenProps) {
  return (
    <div
      className={`${className || ''} flex h-full w-full ${
        center ? 'items-center justify-center' : ''
      }`}
    >
      {children ?? <LoaderDefault size={160} />}
    </div>
  );
}
