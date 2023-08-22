import { LoaderSize, PlatformThemeOrMode } from './enums';

export const isNestedRoute = (route: string, hasi18nBasePath?: boolean) =>
  route.split('/').length > (!hasi18nBasePath ? 2 : 3);

export const stackHasNestedRoute = (tabMetadata: Array<string>): boolean =>
  tabMetadata.some((route: string) => isNestedRoute(route));

export const isSSR =
  typeof window === 'undefined' || typeof document === 'undefined';

export const isSystemDarkMode = () =>
  window?.matchMedia('(prefers-color-scheme: dark)').matches;

export const mapLoaderSizeToStyleObj = (size: LoaderSize) => ({
  width: size === LoaderSize.DEFAULT ? '64px' : '80px',
  height: size === LoaderSize.DEFAULT ? '64px' : '80px',
});

export const getPlatformThemeOrMode = (theme: PlatformThemeOrMode) =>
  theme === PlatformThemeOrMode.MD || theme === PlatformThemeOrMode.MATERIAL
    ? PlatformThemeOrMode.MATERIAL
    : PlatformThemeOrMode.IOS;

export const uppercaseString = (string: string) =>
  string[0].toUpperCase() + string.substring(1);
export const getTitleFromSegments = (
  // segments?: string[],
  pathname: string,
  chainedSegmentsStrategy = true
): string => {
  // if (!segments?.length) {
  //   return '';
  // }
  // if (chainedSegmentsStrategy) {
  // }
  // console.log(segments, 'segway');
  // let currentSegment = segments[segments.length - 1];
  if (!pathname) {
    return '';
  }

  const _parts = pathname.split('/');
  const parts = _parts[_parts.length - 1];
  if (!parts) return '';

  if (parts.includes('-')) {
    return parts
      .split('-')
      .map((s) => uppercaseString(s))
      .join(' ');
  }
  if (!parts) {
    return '';
  }

  return uppercaseString(parts);
};
export const getTargetTabFromHref = (href: string) => {
  return `/${href.split('/')[1]}`;
};

export const getScreenId = (
  params: {
    tabScreen: string;
    secondaryScreen?: string[];
  },
  isTabRoute?: boolean
) => {
  let tabRoute = params?.tabScreen;
  if (isTabRoute) {
    tabRoute = tabRoute.replace('(.)(.)', '');
  }
  return `/${!tabRoute ? '' : tabRoute}${
    !params.secondaryScreen
      ? ''
      : params.secondaryScreen.map((path) => '/' + path).join('')
  }`;
};
