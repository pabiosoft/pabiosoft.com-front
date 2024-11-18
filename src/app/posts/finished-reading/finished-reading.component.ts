import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleModel } from 'src/app/core/models/article.model';
import { ArticleService } from 'src/app/core/services/article.service';

@Component({
  selector: 'app-finished-reading',
  templateUrl: './finished-reading.component.html',
  styleUrl: './finished-reading.component.scss'
})
export class FinishedReadingComponent implements OnInit {
  technologies: any[] = [];
  suggestedArticle: ArticleModel[] = [];
  currentArticleId: number | any = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['technologies']) {
        this.technologies = JSON.parse(params['technologies']);
      }
      if (params['articleId']) { 
        this.currentArticleId = +params['articleId']; 
      }
      this.getSuggestedArticle();
    });
  }

  goBack() {
    this.router.navigate(['/posts']); 
  }

  getSuggestedArticle() {
    if (this.technologies && this.technologies.length > 0) {
      this.articleService.getArticlesByTechnologies(this.technologies).subscribe(Article => {
        this.suggestedArticle = Article.filter(blog => blog["@id"] !== this.currentArticleId);
      });
    }
  }
}
