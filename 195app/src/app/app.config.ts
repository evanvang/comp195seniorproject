import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBpZ6FpSzenAOPtIedMC-PHTHPiAllTVas',
  authDomain: 'angularproject-2bf87.firebaseapp.com',
  projectId: 'angularproject-2bf87',
  storageBucket: 'angularproject-2bf87.appspot.com',
  messagingSenderId: '230906142222',
  appId: '1:230906142222:web:816c86d4d48e29d365a65f',
};

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig)), 
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
    )]
};



//  OLD CODE
// import { ApplicationConfig, importProvidersFrom } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { getAuth, provideAuth } from '@angular/fire/auth';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes), 
//     provideClientHydration(), 
//     importProvidersFrom(
//       provideFirebaseApp(() => initializeApp({"projectId":"angularproject-2bf87","appId":"1:230906142222:web:816c86d4d48e29d365a65f","storageBucket":"angularproject-2bf87.appspot.com","apiKey":"AIzaSyBpZ6FpSzenAOPtIedMC-PHTHPiAllTVas","authDomain":"angularproject-2bf87.firebaseapp.com","messagingSenderId":"230906142222"})), 
//       provideAuth(() => getAuth()))]
// };
