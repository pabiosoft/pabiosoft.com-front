import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Initialisez l'environnement de test Angular.
getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
);

// Charger les tests manuellement sans `require.context`.
const testFiles = [
  './app/app.component.spec.ts',
  // Ajoutez d'autres fichiers de test ici
];
testFiles.forEach(file => {
  require(file);
});
