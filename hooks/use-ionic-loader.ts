'use client';

import * as React from 'react';
import { initialize } from '@ionic/core/components';
import { defineCustomElements } from '@ionic/core/loader';

interface IonicLoaderOptions {
  mode: 'ios' | 'material' | 'md';
}

export enum State {
  INITIALIZING = 'INITIALIZING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
}

export const useIonicLoader = (options: IonicLoaderOptions) => {
  const [state, setState] = React.useState(State.INITIALIZING);

  React.useEffect(() => {
    if (state === State.COMPLETE) {
      return;
    }
    // `useEffect` runs only on the client.
    // Therefore, this is the phase during which client-side hydration occurs.
    initialize({
      // Forcing the global Ionic mode `ios` to confirm that the setup is working
      // with a custom configuration.
      mode: options.mode === 'material' ? 'md' : options.mode,
    });

    defineCustomElements(window)
      .then(() => setState(State.COMPLETE))
      .catch(() => setState(State.ERROR));
  }, [state, options?.mode]);

  return {
    initializing: state === State.INITIALIZING,
    complete: state === State.COMPLETE,
    error: state === State.ERROR,
  };
};
