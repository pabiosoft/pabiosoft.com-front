import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/core/services/article.service';
import { ArticleModel } from 'src/app/core/models/article.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  article: ArticleModel | any = null;
  currentChapterIndex = 0;
  sidebarVisible = false;
  showSubChapter: boolean = false;
  showQuiz: boolean = false;


  currentSubChapterIndex: number = 0;
  subChaptersRead: boolean[] = [];

  @ViewChild('articleContent') articleContent!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.articleService.getArticleById(articleId).subscribe((data) => {
        this.article = data;
      });
    }
  }

  

  private scrollToTop(): void {
    this.articleContent.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  
  markSubChapterAsRead(subChapterIndex: number) {
    this.subChaptersRead[subChapterIndex] = true;
  }

  previousChapter() {
    if (this.currentChapterIndex > 0) {
      this.currentChapterIndex--;
      this.scrollToTop();
    }
  }

  nextChapter() {
    if (this.currentChapterIndex < (this.article?.chapters.length || 0) - 1) {
      this.currentChapterIndex++;
      this.scrollToTop();
    }
  }

  goToChapter(index: any): void {
    this.currentChapterIndex = index;
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  goBack(): void {
    this.location.back();
  }

  terminer(): void {
    if (this.article && this.article.technologies) {
      const technologies = this.article.technologies.map((tech: any) => ({
        name: tech.name,
      }));

      this.router.navigate(['/posts/finish'], {
        queryParams: {
          technologies: JSON.stringify(technologies),
          blogId: this.article['@id'],
        },
      });
    }
  }
}