// import { Injectable } from '@angular/core';
// import hljs from 'highlight.js';

// @Injectable({
//   providedIn: 'root'
// })
// export class HighlightService {

//   constructor() { }

//   highlightElement(element: HTMLElement): void {
//     hljs.highlightElement(element);
//   }
// }
import { Injectable } from '@angular/core';
import hljs from 'highlight.js';

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  constructor() { }

  highlightElement(element: HTMLElement): void {
    hljs.highlightElement(element); // Applique le surlignage syntaxique
  }
}
