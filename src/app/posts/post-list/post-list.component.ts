import { Component, OnInit } from '@angular/core';
import { ArticleModel } from 'src/app/core/models/article.model';
import { ArticleService } from 'src/app/core/services/article.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  articles: ArticleModel[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 1;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
   this.loadInitialData()
  }

  loadInitialData(){
    this.articleService.loadInitialData().subscribe({
      next: (articles) => {
        if (articles) {
          this.articles = articles;
          this.totalPages = Math.ceil(this.articles.length / this.itemsPerPage);
        }
      },
      error: (error) => console.error('Erreur lors du chargement des articles :', error)
    });
  }

  onLireClick(article: any): void {
    console.log('Article sélectionné:', article);
  }

  // liste des article sur le home.component

  get paginatedArticles(): ArticleModel[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.articles.slice(start, end);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

}
