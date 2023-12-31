import * as React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClientLayout as Wrapper } from '@/components';

import './globals.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/core/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/core/css/normalize.css';
import '@ionic/core/css/structure.css';
import '@ionic/core/css/typography.css';

import 'overlayscrollbars/overlayscrollbars.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { TITLE } from '@/app/constants';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--ion-default-font',
});

export const metadata: Metadata = {
  title: 'Create Next App + Ionic SSR',
  description: 'Generated by create next app',
};

const tabLabels = ['Home', 'Account', 'Search', 'Settings'];

export default async function RootLayout({ tabs }: { tabs: React.ReactNode }) {
  return (
    <html lang='en' className={inter.className}>
      <body className='bg-slate-900'>
        <Wrapper
          headerTitle={TITLE}
          options={{
            mode: 'ios',
            dark: false,
          }}
          tabbarProps={{
            icons: true,
            labels: true,
          }}
          tabLabels={tabLabels}
        >
          {tabs}
        </Wrapper>
      </body>
    </html>
  );
}
