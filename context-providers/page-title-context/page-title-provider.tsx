'use client';

import * as React from 'react';
import PageTitleContext from './page-title-context';

export const PageTitleProvider = ({ children, initialTitle }) => {
  const [pageTitle, setPageTitle] = React.useState(initialTitle);

  const updatePageTitle = (title: string) => {
    setPageTitle(title);
  };
  const memoizedPageTitleObj = React.useMemo(
    () => ({
      pageTitle,
      updatePageTitle,
    }),
    [pageTitle, updatePageTitle]
  );

  return (
    <PageTitleContext.Provider value={memoizedPageTitleObj}>
      {children}
    </PageTitleContext.Provider>
  );
};
