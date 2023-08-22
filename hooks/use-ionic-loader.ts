'use client';

import * as React from 'react';
import { initialize } from '@ionic/core/components';
import { defineCustomElements } from '@ionic/core/loader';
import { PlatformThemeOrMode } from '@/utils';

interface IonicLoaderOptions {
  mode: PlatformThemeOrMode;
}

export enum State {
  INITIALIZING = 'INITIALIZING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
}

export const useIonicLoader = (
  options: IonicLoaderOptions,
  sharedConfig: any,
  setTheme: any
) => {
  const [state, setState] = React.useState(State.INITIALIZING);

  React.useEffect(() => {
    if (state === State.COMPLETE) {
      return;
    }

    setTheme(options.mode);

    // `useEffect` runs only on the client.
    // Therefore, this is the phase during which client-side hydration occurs.
    initialize({
      // Forcing the global Ionic mode `ios` to confirm that the setup is working
      // with a custom configuration.
      mode:
        options.mode === PlatformThemeOrMode.MATERIAL
          ? PlatformThemeOrMode.MD
          : options.mode,
    });

    defineCustomElements(window);
    // TODO: newer versions of ionic core have removed the promise returned
    // by `defineCustomElements`. Clean this up or find a different way to
    // handle loading state
    // .then(() => setState(State.COMPLETE))
    // .catch(() => setState(State.ERROR));
  }, [setTheme, state, options?.mode]);

  React.useInsertionEffect(() => {
    const $style = document.createElement('style');
    document.head.appendChild($style);

    $style.innerHTML = `ion-progress-bar {
    --background: ${sharedConfig.primaryColor};
    --progress-background: #04d99e; }
ion-segment {
  border-radius: 20px;
}

@media (prefers-color-scheme: dark) {
  ion-segment-button.md::part(native) {
    color: #FFF;
  }
  
  ion-segment-button.ios::part(native) {
    background: #14171b;
    color: #FFF;
  }
  
  .segment-button-checked.ios::part(native) {
    background: #595959;
    color: #fff;
  }
}

.segment-button-checked.md::part(native) {
  color: ${sharedConfig.primaryColor};
  font-weight: 700;
}

ion-segment-button.md::part(indicator-background) {
  height: 4px;
}

ion-segment-button.ios::part(indicator-background) {
  border-radius: 50px;
}
    `;
  });

  return {
    initializing: state === State.INITIALIZING,
    complete: state === State.COMPLETE,
    error: state === State.ERROR,
  };
};
