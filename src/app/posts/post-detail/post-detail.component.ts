import { Component, OnInit } from '@angular/core';
import {ResumeProfilsComponent} from "../../pages/resume-profils/resume-profils.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/core/services/article.service';
import { ArticleModel } from 'src/app/core/models/article.model';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit{

  article: ArticleModel | any = null;
  currentChapterIndex = 0;
  sidebarVisible: boolean = false;

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

  nextChapter() {
    if (this.currentChapterIndex < (this.article?.chapters.length || 0) - 1) {
      this.currentChapterIndex++;
    }
  }

  previousChapter() {
    if (this.currentChapterIndex > 0) {
      this.currentChapterIndex--;
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

  terminer() {
    if (this.article && this.article.technologies) {
      const technologies = this.article.technologies.map((tech: any) => ({ name: tech.name }));
      
      this.router.navigate(['/posts/finish'], {
        queryParams: {
          technologies: JSON.stringify(technologies), 
          blogId: this.article['@id'] 
        }
      });
    }
  }
  
}