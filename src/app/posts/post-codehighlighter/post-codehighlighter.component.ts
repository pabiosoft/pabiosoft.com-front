/**
 * sans section 
 */
// import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnChanges, SimpleChanges, OnDestroy, AfterViewChecked } from '@angular/core'; 
// import { ace } from 'src/ace-config'

// @Component({
//   selector: 'app-post-codehighlighter',
//   templateUrl: './post-codehighlighter.component.html',
//   styleUrls: ['./post-codehighlighter.component.scss']
// })
// export class PostCodehighlighterComponent implements AfterViewInit, AfterViewChecked, OnChanges, OnDestroy {
//   @ViewChild('previewElement') previewElement!: ElementRef;
//   @Input() code: string = 'votre code';
//   @Input() language: string = 'typescript';
//   codeLabel: string = 'Votre code TypeScript';
//   previewMode: boolean = false;
//   editor: ace.Ace.Editor | undefined;
//   private editorInitialized = false;

//   constructor() {}

//   ngAfterViewInit(): void {
//     if (this.previewMode) {
//       this.initializePreviewEditor();
//     }
//   }

//   ngAfterViewChecked(): void {
//     if (this.previewMode && !this.editorInitialized && this.previewElement) {
//       this.initializePreviewEditor();
//     }
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['language']) {
//       this.updateLabel();
//       if (this.editor) {
//         this.setPreviewEditorMode();
//       }
//     }
//     if (this.editor) {
//       this.updatePreviewContent();
//     }
//   }

//   ngOnDestroy(): void {
//     this.destroyEditor();
//   }

//   initializePreviewEditor(): void {
//     if (!this.previewElement) {
//       console.error("L'élément previewElement est introuvable");
//       return;
//     }
//     this.editor = ace.edit(this.previewElement.nativeElement, {
//       mode: `ace/mode/${this.language}`,
//       theme: 'ace/theme/dracula',  
//       readOnly: true,
//       showPrintMargin: false,
//       fontSize: 14,
//       minLines: 6,
//       maxLines: 25,
//       highlightActiveLine: false,
//     });
//     this.editorInitialized = true;
//     this.updatePreviewContent();
//   }

//   destroyEditor(): void {
//     if (this.editor) {
//       this.editor.destroy();
//       this.editor = undefined;
//       this.editorInitialized = false;
//     }
//   }

//   updatePreviewContent(): void {
//     if (this.editor) {
//       this.editor.setValue(this.code, 1);
//       this.editor.clearSelection();
//     }
//   }

//   setPreviewEditorMode(): void {
//     if (this.editor) {
//       this.editor.session.setMode(`ace/mode/${this.language}`);
//     }
//   }

//   updateLabel(): void {
//     this.codeLabel = `Votre code ${this.language.charAt(0).toUpperCase() + this.language.slice(1)}`;
//   }

//   togglePreviewMode(): void {
//     this.previewMode = !this.previewMode;
//     if (this.previewMode) {
//       this.initializePreviewEditor();
//     } else {
//       this.destroyEditor();
//     }
//   }
// }



/**
 * avec des section 
 */

import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnChanges, SimpleChanges, OnDestroy, AfterViewChecked } from '@angular/core'; 
import { ace } from 'src/ace-config'
interface CodeSection {
  code: string;
  language: string;
}

@Component({
  selector: 'app-post-codehighlighter',
  templateUrl: './post-codehighlighter.component.html',
  styleUrls: ['./post-codehighlighter.component.scss']
})
export class PostCodehighlighterComponent implements AfterViewInit, AfterViewChecked, OnChanges, OnDestroy {
  @ViewChild('previewElement') previewElement!: ElementRef;
  codeSections: CodeSection[] = [{ code: 'votre code', language: 'typescript' }];
  previewMode: boolean = false;
  editors: ace.Ace.Editor[] = [];
  private editorInitialized = false;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.previewMode) {
      this.initializePreviewEditors();
    }
  }

  ngAfterViewChecked(): void {
    if (this.previewMode && !this.editorInitialized && this.previewElement) {
      this.initializePreviewEditors();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editorInitialized) {
      this.updatePreviewContent();
    }
  }

  ngOnDestroy(): void {
    this.destroyEditors();
  }

  initializePreviewEditors(): void {
    this.editors = this.codeSections.map((section, index) => {
      const editorElement = this.previewElement.nativeElement.children[index];
      const editor = ace.edit(editorElement, {
        mode: `ace/mode/${section.language}`,
        theme: 'ace/theme/dracula',
        readOnly: true,
        showPrintMargin: false,
        fontSize: 14,
        minLines: 6,
        maxLines: 25,
        highlightActiveLine: false,
      });
      editor.setValue(section.code, 1);
      editor.clearSelection();
      return editor;
    });
    this.editorInitialized = true;
  }  

  destroyEditors(): void {
    this.editors.forEach(editor => editor.destroy());
    this.editors = [];
    this.editorInitialized = false;
  }

  updatePreviewContent(): void {
    this.editors.forEach((editor, index) => {
      editor.setValue(this.codeSections[index].code, 1);
      editor.clearSelection();
      editor.session.setMode(`ace/mode/${this.codeSections[index].language}`);
    });
  }

  addCodeSection(): void {
    this.codeSections.push({ code: '', language: 'typescript' });
    if (this.previewMode) {
      this.initializePreviewEditors();
    }
  }

  removeCodeSection(index: number): void {
    this.codeSections.splice(index, 1);
    this.destroyEditors();
    if (this.previewMode) {
      this.initializePreviewEditors();
    }
  }

  togglePreviewMode(): void {
    this.previewMode = !this.previewMode;
    if (this.previewMode) {
      this.initializePreviewEditors();
    } else {
      this.destroyEditors();
    }
  }
}
