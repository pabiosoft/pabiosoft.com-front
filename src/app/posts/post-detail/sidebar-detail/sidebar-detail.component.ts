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