import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {ArticleModel} from "../../core/models/article.model";
import {ArticleService} from "../../core/services/article.service";
import {TechnologieService} from "../../core/services/technologie.service";
import {Technology} from "../../core/models/technologies.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  iconAtEnd: boolean = false;
  confirmationMessage: string | null = null;
  loadings: boolean = true;
  //
  articles: ArticleModel[] | null = null;
  technologies: Technology[] | null = null;


  constructor(
      private articleService: ArticleService,
      private technologieService: TechnologieService
  ) {}

  ngOnInit(): void {
    // this.olympics$ = this.olympicService.getOlympics();
    this.articleService.loadInitialData().subscribe({
      next: () => {
        this.articleService.getArticles().subscribe((articles) => {
          this.articles = articles;
        });
      },
      error: (err) => console.error('Error loading articles:', err)
    });
    // Charger les technologies initiales
    this.technologieService.loadInitialData().subscribe({
      next: (data) => (this.technologies = data),
      error: (error) => console.error('Error loading technologies:', error)
    });
  }

  onMouseOver(event: MouseEvent): void {
    const target = event.target as HTMLImageElement; // Assertion de type
    if (target) {
      this.enlargeImage(target);
    }
  }
  onMouseOut(event: MouseEvent): void {
    const target = event.target as HTMLImageElement; // Assertion de type
    if (target) {
      this.resetImage(target);
    }
  }

  // imageService
  enlargeImage(imageElement: HTMLImageElement): void {
    if (imageElement) {
      imageElement.style.transform = 'scale(1.2)';
      imageElement.style.transition = 'transform 0.3s';
    }
  }

  resetImage(imageElement: HTMLImageElement): void {
    if (imageElement) {
      imageElement.style.transform = 'scale(1)';
    }
  }
}
