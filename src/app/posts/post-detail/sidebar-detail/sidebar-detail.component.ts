import { Location } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ArticleModel } from 'src/app/core/models/article.model';

@Component({
  selector: 'app-sidebar-detail',
  templateUrl: './sidebar-detail.component.html',
  styleUrl: './sidebar-detail.component.scss',
})
export class SidebarDetailComponent implements OnInit{
  @Input() article: ArticleModel | null = null;
  @Input() currentChapterIndex: number = 0;
  @Input() currentSubChapterIndex: number = 0;
  @Input() goToChapter: Function = () => {};
  @Output() chapterSelected = new EventEmitter<number>();
  
  constructor(private location: Location){}

  items: any[] = [];

  ngOnInit(): void {
    if (this.article && this.article.chapters) {
      this.items = this.article.chapters.map((chapter, index) => ({
        label: `Chapitre ${index + 1}: ${chapter.title}`,
        command: () => this.navigateToChapter(index),
        icon: index === this.currentChapterIndex ? 'pi pi-check' : 'pi pi-circle' 
      }));
    }


  }
  ngOnChanges(): void {
    if (this.items && this.article && this.article.chapters) {
      this.items = this.article.chapters.map((chapter, index) => ({
        label: `Chapitre ${index + 1}: ${chapter.title}`,
        command: () => this.goToChapter(index),
        icon: index === this.currentChapterIndex ? 'pi pi-check' : 'pi pi-circle'
      }));
    }
  }

  navigateToChapter(index: number) {
    console.table({
      'index':index,
      'curentIndex':this.currentChapterIndex
    })
    this.chapterSelected.emit(index);
  } 

  goBack(): void {
    this.location.back();
  }
}



// import { Location } from '@angular/common';
// import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
// import { ArticleModel } from 'src/app/core/models/article.model';

// @Component({
//   selector: 'app-sidebar-detail',
//   templateUrl: './sidebar-detail.component.html',
//   styleUrls: ['./sidebar-detail.component.scss'],
// })
// export class SidebarDetailComponent implements OnInit, OnChanges {
//   @Input() article: ArticleModel | null = null;
//   @Input() currentChapterIndex: number = 0;
//   @Input() currentSubChapterIndex: number = 0;
//   @Output() chapterSelected = new EventEmitter<{ chapterIndex: number; subChapterIndex?: number }>();

//   items: any[] = [];

//   constructor(private location: Location) {}

//   ngOnInit(): void {
//     this.updateItems();
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['article'] || changes['currentChapterIndex'] || changes['currentSubChapterIndex']) {
//       this.updateItems();
//     }
//   }

//   private updateItems(): void {
//     if (this.article?.chapters) {
//       this.items = this.article.chapters.map((chapter, chapterIndex) => ({
//         label: `Chapitre ${chapterIndex + 1}: ${chapter.title}`,
//         isSelected: chapterIndex === this.currentChapterIndex,
//         subChapters: (chapter.subChapters || []).map((subChapter, subChapterIndex) => ({
//           title: subChapter.title,
//           isSelected:
//             chapterIndex === this.currentChapterIndex && subChapterIndex === this.currentSubChapterIndex,
//           navigate: () => this.navigateToSubChapter(chapterIndex, subChapterIndex),
//         })),
//         navigate: () => this.navigateToChapter(chapterIndex),
//       }));
//     }
//   }

//   navigateToChapter(chapterIndex: number): void {
//     this.chapterSelected.emit({ chapterIndex });
//   }

//   navigateToSubChapter(chapterIndex: number, subChapterIndex: number): void {
//     this.chapterSelected.emit({ chapterIndex, subChapterIndex });
//   }

//   goBack(): void {
//     this.location.back();
//   }
// }
