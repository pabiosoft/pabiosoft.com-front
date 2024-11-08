import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Configure Angular's testing environment.
getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
);

// Importer manuellement tous les fichiers de test `.spec.ts` au lieu d'utiliser `require.context`.
const testContext = (require as any).context('./', true, /\.spec\.ts$/);
testContext.keys().map(testContext);
