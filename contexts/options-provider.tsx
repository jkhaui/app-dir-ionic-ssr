'use client';

import * as React from 'react';
import OptionsContext from './options-context';

export const OptionsProvider = ({ children, options }) => {
  return (
    <OptionsContext.Provider value={options}>
      {children}
    </OptionsContext.Provider>
  );
};
