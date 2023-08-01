'use client';

import * as React from 'react';
import { initialize } from '@ionic/core/components';
import { defineCustomElements } from '@ionic/core/loader';

interface IonicLoaderOptions {
  mode?: 'ios' | 'md';
}

export const useIonicLoader = (options?: IonicLoaderOptions) => {
  const hasBootstrappedLoaderRef = React.useRef(false);

  return React.useEffect(() => {
    if (hasBootstrappedLoaderRef.current) {
      return;
    }
    // `useEffect` runs only on the client.
    // Therefore, this is the phase during which client-side hydration occurs.
    initialize({
      // Forcing the global Ionic mode `ios` to confirm that the setup is working
      // with a custom configuration.
      mode: options?.mode || 'ios',
    });

    defineCustomElements(window).then(
      () => (hasBootstrappedLoaderRef.current = true)
    );
  }, [options?.mode]);
};
