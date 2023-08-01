'use client';

import * as React from 'react';
import { KonstaProvider } from 'konsta/react';
import { TITLE } from '@/app/constants';
import { AnimatePresence } from 'framer-motion';
import { TabNavBar } from '@/components';
// import { useIonicLoader } from '@/hooks';
import { initialize } from '@ionic/core/components';
import { defineCustomElements } from '@ionic/core/loader';

import '../globals.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/core/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/core/css/normalize.css';
import '@ionic/core/css/structure.css';
import '@ionic/core/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/core/css/padding.css';
import '@ionic/core/css/float-elements.css';
import '@ionic/core/css/text-alignment.css';
import '@ionic/core/css/text-transformation.css';
import '@ionic/core/css/flex-utils.css';
import '@ionic/core/css/display.css';
import 'overlayscrollbars/overlayscrollbars.css';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ClientLayout({ tabs }) {
  // useIonicLoader();

  React.useEffect(() => {
    // `useEffect` runs only on the client.
    // Therefore, this is the phase during which client-side hydration occurs.
    initialize({
      // Forcing the global Ionic mode `ios` to confirm that the setup is working
      // with a custom configuration.
      mode: 'ios',
    });

    defineCustomElements(window);
  }, []);

  return (
    <KonstaProvider theme={'parent'}>
      <ion-app>
        <ion-split-pane when='lg' content-id='main'>
          <ion-menu content-id='main'>
            <ion-header>
              <ion-toolbar color='transparent'>
                <ion-title>Menu</ion-title>
              </ion-toolbar>
            </ion-header>
            <ion-content>Menu Content</ion-content>
          </ion-menu>
          <div id={'main'} className={'md:min-h-full md:min-w-full'}>
            {/*<ion-router-outlet>{tabs}</ion-router-outlet>*/}
            <ion-header collapse={'fade'} translucent>
              <ion-toolbar color={'transparent'}>
                <ion-title>{TITLE}</ion-title>
              </ion-toolbar>
            </ion-header>
            <AnimatePresence mode={'wait'} initial={false}>
              {tabs}
            </AnimatePresence>
            <TabNavBar />
          </div>
        </ion-split-pane>
      </ion-app>
    </KonstaProvider>
  );
}
