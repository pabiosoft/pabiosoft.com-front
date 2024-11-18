import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ace} from "../../../ace-config";

@Component({
  selector: 'app-post-code',
  standalone: true,
  imports: [],
  templateUrl: './post-code.component.html',
  styleUrl: './post-code.component.scss'
})
export class PostCodeComponent implements AfterViewInit{

  @Input() language: string = 'javascript'; // Langage par défaut
  @Input() code: string = ''; // Code source

  @ViewChild('editorElement') editorElement!: ElementRef;

  ngAfterViewInit(): void {
    this.initializeEditor();
  }

  private initializeEditor(): void {
    const editor = ace.edit(this.editorElement.nativeElement, {
      mode: `ace/mode/${this.language}`, // Définit le mode selon le langage
      theme: 'ace/theme/dracula', // Définit le thème
      readOnly: true, // Lecture seule
      showPrintMargin: false, // Supprime la marge d'impression
      fontSize: 14, // Taille de police
      minLines: 6, // Nombre minimal de lignes visibles
      maxLines: 25, // Nombre maximal de lignes visibles
      highlightActiveLine: false, // Pas de surbrillance de la ligne active
    });
    editor.setValue(this.code, 1); // Insère le code source
    editor.clearSelection(); // Supprime toute sélection par défaut
  }
}
