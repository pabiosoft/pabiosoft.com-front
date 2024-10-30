import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Blog } from 'src/app/pages/home/home.component';

@Component({
  selector: 'app-sidebar-blog',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './sidebar-blog.component.html',
  styleUrl: './sidebar-blog.component.scss'
})
export class SidebarBlogComponent {
  @Input() blog!: Blog; 
  @Input() currentChapterIndex!: number;

  selectChapter(index: number) {
    // Logic to switch chapter can be added here
    this.currentChapterIndex = index;
  }

}
