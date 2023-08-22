import * as React from 'react';
import { UIPreferencesContext } from '@/context-providers';

export const useUIPreferences = () => {
    return React.useContext(UIPreferencesContext);
};
