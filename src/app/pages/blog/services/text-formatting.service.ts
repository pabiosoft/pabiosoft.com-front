// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TextFormattingService {
//   // Méthode pour formater le texte avec les balises spéciales
//   formatText(input: string): string {
//     let formattedText = input;

//     // Traitement pour le texte en gras entre 'G' et 'G'
//     formattedText = this.applyFormatting(formattedText, 'G', 'strong');

//     // Traitement pour le texte en italique entre 'I' et 'I'
//     formattedText = this.applyFormatting(formattedText, 'I', 'em');

//     // Traitement pour le texte barré entre 'S' et 'S'
//     formattedText = this.applyFormatting(formattedText, 'S', 'del');

//     // Traitement pour le texte souligné entre 'U' et 'U'
//     formattedText = this.applyFormatting(formattedText, 'U', 'u');

//     // Traitement pour le texte surligné entre 'H' et 'H'
//     formattedText = this.applyFormatting(formattedText, 'H', 'mark');

//     // Traitement pour les titres : 'H1' pour H1, 'H2' pour H2
//     formattedText = this.applyHeadingFormatting(formattedText, 'H1', 'h1');
//     formattedText = this.applyHeadingFormatting(formattedText, 'H2', 'h2');

//     // Traitement pour les retours à la ligne : 'BR'
//     formattedText = formattedText.split(/BR/).join('<br/>');

//     // Traitement pour le texte centré entre 'C' et 'C'
//     formattedText = this.applyFormatting(formattedText, 'C', 'div style="text-align:center;"');

//     // Traitement pour les liens : 'LINK[URL]texte LINK'
//     formattedText = this.applyLinkFormatting(formattedText);

//     // Traitement pour les listes à puces : 'UL' et 'LI'
//     formattedText = this.applyListFormatting(formattedText, 'UL', 'LI', 'ul');

//     // Traitement pour les listes numérotées : 'OL' et 'LI'
//     formattedText = this.applyListFormatting(formattedText, 'OL', 'LI', 'ol');

//     return formattedText;
//   }

//   private applyFormatting(text: string, marker: string, tag: string): string {
//     return text.split(new RegExp(`${marker}(.*?)${marker}`)).map((part, index) => {
//       return index % 2 === 1 ? `<${tag}>${part}</${tag}>` : part;
//     }).join('');
//   }

//   private applyHeadingFormatting(text: string, marker: string, tag: string): string {
//     return text.split(new RegExp(`(${marker})(.*?)(${marker})`)).map((part, index) => {
//       if (index % 4 === 1) {
//         return `<${tag}>${part}</${tag}>`; // Enlève le marqueur du texte
//       }
//       return part;
//     }).join('');
//   }

//   private applyLinkFormatting(text: string): string {
//     return text.split(/Z\[(.*?)\](.*?)Z/).map((part, index) => {
//       if (index % 3 === 2) {
//         const url = part.split('[')[1].split(']')[0];
//         const linkText = part.split(']')[1];
//         return `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
//       }
//       return part;
//     }).join('');
//   }

//   private applyListFormatting(text: string, listMarker: string, itemMarker: string, listTag: string): string {
//     const listRegex = new RegExp(`${listMarker}(.*?)${listMarker}`, 'g');
//     return text.replace(listRegex, (match, contents) => {
//       const items: string[] = contents.split(new RegExp(`${itemMarker}(.*?)${itemMarker}`)).filter((item: string, index: any) => index % 2 === 1);
//       const listItems = items.map((item: string) => `<li>${item}</li>`).join('');
//       return `<${listTag}>${listItems}</${listTag}>`;
//     });
//   }
// }




import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextFormattingService {
  // Méthode pour formater le texte avec les balises spéciales
  formatText(input: string): string {
    // Traitement pour le texte en gras entre 'G' et 'G'
    let formattedText = input.split(/G(.*?)G/).map((part, index) => {
      return index % 2 === 1 ? `<strong>${part}</strong>` : part;
    }).join('');

    // Traitement pour le texte en italique entre 'I' et 'I'
    formattedText = formattedText.split(/I(.*?)I/).map((part, index) => {
      return index % 2 === 1 ? `<em>${part}</em>` : part;
    }).join('');

    // Traitement pour le texte barré entre 'S' et 'S'
    formattedText = formattedText.split(/S(.*?)S/).map((part, index) => {
      return index % 2 === 1 ? `<del>${part}</del>` : part;
    }).join('');

    // Traitement pour le texte souligné entre 'U' et 'U'
    formattedText = formattedText.split(/U(.*?)U/).map((part, index) => {
      return index % 2 === 1 ? `<u>${part}</u>` : part;
    }).join('');

    // Traitement pour le texte surligné entre 'H' et 'H'
    formattedText = formattedText.split(/H(.*?)H/).map((part, index) => {
      return index % 2 === 1 ? `<mark>${part}</mark>` : part;
    }).join('');

    // Traitement pour les titres : 'H1' pour H1, 'H2' pour H2
    formattedText = formattedText.split(/(H1|H2)(.*?)H\1/).map((part, index) => {
      if (index % 3 === 1) {
        const tag = part.startsWith('H1') ? 'h1' : 'h2';
        return `<${tag}>${part.slice(2)}</${tag}>`; // Enlève 'H1' ou 'H2' du texte
      }
      return part;
    }).join('');

    // Traitement pour les retours à la ligne : 'BR'
    formattedText = formattedText.split(/BR/).join('<br/>');

    return formattedText;
  }
}
