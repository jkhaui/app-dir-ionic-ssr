'use client'

import React, {useEffect} from "react";
import {initialize} from "@ionic/core";
import {defineCustomElements} from "@ionic/core/loader";
import {KonstaProvider, Link} from "konsta/react";
import {TITLE} from "@/app/constants";

export default function ClientLayout({children}) {
    useEffect(() => {
        // `useEffect` runs only on the client.
        // Therefore, this is the phase during which clientside hydration occurs.
        initialize({
            // Forcing the global Ionic mode `ios` to confirm that the setup is working
            // with a custom configuration.
            mode: 'ios'
        })
        defineCustomElements(window);
    }, []);

    return (
        <KonstaProvider theme={'parent'}>
            <ion-app className="flex min-h-screen flex-col items-center justify-between p-24">
                <ion-header translucent>
                    <ion-toolbar>
                        <Link slot="start" toolbar>
                            Link 1
                        </Link>
                        <Link slot="end" toolbar>
                            Link 2
                        </Link>
                        <ion-title>{TITLE}</ion-title>
                    </ion-toolbar>
                </ion-header>
                {children}
            </ion-app>
        </KonstaProvider>
    );
}
