import { CommonModule } from '@angular/common';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { ArticleModel } from 'src/app/core/models/article.model';
import {MenuItem} from "primeng/api";
import {Menu} from "primeng/menu";

@Component({
  selector: 'app-sidebar-detail',
  templateUrl: './sidebar-detail.component.html',
  styleUrl: './sidebar-detail.component.scss',
})
export class SidebarDetailComponent implements OnInit{
  @Input() article: ArticleModel | null = null;
  @Input() currentChapterIndex: number = 0;
  @Input() goToChapter: Function = () => {};

  //


  items: any[] = [];

  ngOnInit(): void {
    if (this.article && this.article.chapters) {
      this.items = this.article.chapters.map((chapter, index) => ({
        label: `Chapitre ${index + 1}: ${chapter.title}`,
        command: () => this.navigateToChapter(index),
        icon: index === this.currentChapterIndex ? 'pi pi-check' : 'pi pi-circle' // Icône dynamique
      }));
    }


  }
  // Mettre à jour l'icône si le chapitre actuel change
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
    this.currentChapterIndex = index;
  }
}
