import * as React from 'react';
import { AuthContext } from '@/context-providers';

export const useAuth = () => {
  return React.useContext(AuthContext);
};
