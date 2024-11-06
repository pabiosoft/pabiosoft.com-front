import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ArticleModel } from 'src/app/core/models/article.model';

@Component({
  selector: 'app-sidebar-detail',
  templateUrl: './sidebar-detail.component.html',
  styleUrl: './sidebar-detail.component.scss'
})
export class SidebarDetailComponent {
  @Input() article: ArticleModel | null = null; 
  @Input() currentChapterIndex: number = 0; 
  @Input() goToChapter: Function = () => {}; 
}
