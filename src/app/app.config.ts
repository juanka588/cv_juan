import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

console.log('[AppConfig] Firebase config:', {
  authDomain: environment.firebase.authDomain,
  databaseURL: environment.firebase.databaseURL,
  hasApiKey: environment.firebase.apiKey !== 'YOUR_FIREBASE_API_KEY',
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideFirebaseApp(() => {
      console.log('[AppConfig] Initializing Firebase app...');
      const app = initializeApp(environment.firebase);
      console.log('[AppConfig] Firebase app initialized:', app.name);
      return app;
    }),
    provideDatabase(() => {
      const db = getDatabase();
      console.log('[AppConfig] Database initialized');
      return db;
    }),
    provideAuth(() => {
      const auth = getAuth();
      console.log('[AppConfig] Auth initialized');
      return auth;
    }),
  ],
};
