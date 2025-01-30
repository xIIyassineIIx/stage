import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"stage-2f048","appId":"1:652399478876:web:f681c3fdf304bc51363e99","storageBucket":"stage-2f048.firebasestorage.app","apiKey":"AIzaSyDMS-rq1JXFZkEwLrtHdUrPt9D6yL1XdFE","authDomain":"stage-2f048.firebaseapp.com","messagingSenderId":"652399478876"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
