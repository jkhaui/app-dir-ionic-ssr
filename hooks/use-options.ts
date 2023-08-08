import * as React from 'react';
import { OptionsContext } from '@/context-providers';

export const useOptions = () => {
  return React.useContext(OptionsContext);
};
