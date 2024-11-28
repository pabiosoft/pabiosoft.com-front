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
    // this.location.back();
    this.router.navigate(['/posts'])
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









// import {
//   Component,
//   ElementRef,
//   EventEmitter,
//   OnInit,
//   Output,
//   ViewChild,
//   AfterViewInit,
// } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ArticleService } from 'src/app/core/services/article.service';
// import { ArticleModel } from 'src/app/core/models/article.model';
// import { Location } from '@angular/common';

// @Component({
//   selector: 'app-post-detail',
//   templateUrl: './post-detail.component.html',
//   styleUrls: ['./post-detail.component.scss'],
// })
// export class PostDetailComponent implements OnInit, AfterViewInit {
//   article: ArticleModel | any = null;
//   currentChapterIndex = 0;
//   currentSubChapterIndex = -1;
//   sidebarVisible = false;
//   showQuizModal = false;

//   @ViewChild('articleContent') articleContent!: ElementRef;
//   @Output() subChapterSelected = new EventEmitter<number>();

//   constructor(
//     private route: ActivatedRoute,
//     private articleService: ArticleService,
//     private location: Location,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     const articleId = this.route.snapshot.paramMap.get('id');
//     if (articleId) {
//       this.articleService.getArticleById(articleId).subscribe((data) => {
//         this.article = {
//           ...data,
//           chapters: data.chapters || [],
//         };

//         if (!this.article.chapters || !Array.isArray(this.article.chapters)) {
//           console.error(
//             'Chapitres manquants ou mal formatés dans l\'article:',
//             this.article
//           );
//         }
//       });
//     }
//   }

//   ngAfterViewInit(): void {
//     console.log('articleContent:', this.articleContent);
//   }

//   scrollToTop(): void {
//     if (this.articleContent?.nativeElement) {
//       this.articleContent.nativeElement.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start',
//       });
//     }
//   }

//   nextChapter(): void {
//     const currentChapter = this.article?.chapters[this.currentChapterIndex];

//     if (
//       currentChapter?.subChapters &&
//       currentChapter.subChapters.length > 0
//     ) {
//       if (this.currentSubChapterIndex < currentChapter.subChapters.length - 1) {
//         this.currentSubChapterIndex++;
//         this.scrollToTop();
//         return;
//       }
//     }

//     if (this.currentChapterIndex < (this.article?.chapters.length || 0) - 1) {
//       this.currentChapterIndex++;
//       this.currentSubChapterIndex = -1;
//       this.scrollToTop();
//     } else {
//       this.showQuizModal = true;
//     }
//   }

//   previousChapter(): void {
//     if (this.currentSubChapterIndex > 0) {
//       this.currentSubChapterIndex--;
//       this.scrollToTop();
//       return;
//     }

//     if (this.currentChapterIndex > 0) {
//       this.currentChapterIndex--;
//       const previousChapter = this.article?.chapters[this.currentChapterIndex];
//       this.currentSubChapterIndex = previousChapter?.subChapters
//         ? previousChapter.subChapters.length - 1
//         : -1;
//       this.scrollToTop();
//     }
//   }

//   completeQuiz(): void {
//     this.showQuizModal = false; // Cache le quiz
//     alert('Quiz terminé !'); // Notification
//   }

//   closeQuizModal(): void {
//     this.showQuizModal = false;
//   }

//   goToChapter(event: { chapterIndex: number; subChapterIndex?: number }): void {
//     this.currentChapterIndex = event.chapterIndex;
//     this.currentSubChapterIndex = event.subChapterIndex ?? -1;
//     this.scrollToTop();
//   }

//   terminer(): void {
//     if (this.article && this.article.technologies) {
//       const technologies = this.article.technologies.map((tech: any) => ({
//         name: tech.name,
//       }));

//       this.router.navigate(['/posts/finish'], {
//         queryParams: {
//           technologies: JSON.stringify(technologies),
//           blogId: this.article['@id'],
//         },
//       });
//     }
//   }
// }