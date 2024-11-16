import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Configurez l'environnement de test Angular
getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
);

// Importez directement vos fichiers de tests
import './app/posts/post-list/post-list.component.spec';
// Importez tous les autres fichiers de tests ici si nécessaire




// import 'zone.js/testing';
// import { getTestBed } from '@angular/core/testing';
// import {
//   BrowserDynamicTestingModule,
//   platformBrowserDynamicTesting
// } from '@angular/platform-browser-dynamic/testing';
//
// declare const require: {
//   context(path: string, deep?: boolean, filter?: RegExp): {
//     <T>(id: string): T;
//     keys(): string[];
//   };
// };
//
// // First, initialize the Angular testing environment.
// getTestBed().initTestEnvironment(
//     BrowserDynamicTestingModule,
//     platformBrowserDynamicTesting(),
// );
//
// // Then we find all the tests.
// const context = require.context('./app/posts/posts-list', true, /\.spec\.ts$/);
// // And load the modules.
// context.keys().forEach(context);



