'use client'

import React, {useEffect} from "react";
import {initialize} from "@ionic/core/components";
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
            <ion-app>
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
                <ion-split-pane when="lg" content-id="main">
                    <ion-menu content-id="main">
                        <ion-header>
                            <ion-toolbar color="tertiary">
                                <ion-title>Menu</ion-title>
                            </ion-toolbar>
                        </ion-header>
                        <ion-content className="ion-padding"> Menu Content</ion-content>
                    </ion-menu>
                    {children}
                </ion-split-pane>
            </ion-app>
        </KonstaProvider>
    );
}
