import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ResumeProfilsComponent} from "../../pages/resume-profils/resume-profils.component";
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/core/services/article.service';
import { ArticleModel } from 'src/app/core/models/article.model';
import { CommonModule, Location } from '@angular/common';
// import * as Prism from 'prismjs';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit, AfterViewInit{

  article: ArticleModel | any = null;
  currentChapterIndex = 0;
  sidebarVisible: boolean = false;

  //
  @ViewChild('articleContent') articleContent!: ElementRef;
//

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.articleService.getArticleById(articleId).subscribe((data) => {
        this.article = data;
      });
    }
  }
  ngAfterViewInit(): void {
    // Prism.highlightAll();
  }

  private scrollToTop(): void {
    this.articleContent.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  nextChapter() {
    if (this.currentChapterIndex < (this.article?.chapters.length || 0) - 1) {
      this.currentChapterIndex++;
      this.scrollToTop();
    }
  }

  previousChapter() {
    if (this.currentChapterIndex > 0) {
      this.currentChapterIndex--;
      this.scrollToTop();
    }
  }

  goToChapter(index: number) {
    this.currentChapterIndex = index;
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible; // Toggle de la visibilité de la sidebar
  }

  goBack() {
    this.location.back();
  }

  copyCode() {
    const code = `
// Your JavaScript code goes here
function greet(name) {
    return \`Hello, \${name}!\`;
}`;
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  }

}
