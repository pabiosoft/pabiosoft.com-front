import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ArticleModel } from '../models/article.model';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private articlesUrl = './assets/mock/articles.json';
    private articles$ = new BehaviorSubject<ArticleModel[] | null>(null);

    constructor(private http: HttpClient) {}

    loadInitialData(): Observable<ArticleModel[]> {
        return this.http.get<ArticleModel[]>(this.articlesUrl).pipe(
            tap((articles) => this.articles$.next(articles)),
            catchError((error) => {
                console.error('Failed to load articles:', error);
                this.articles$.next(null);
                return of([]);
            })
        );
    }

    getArticles(): Observable<ArticleModel[] | null> {
        return this.articles$.asObservable();
    }

    getArticleById(id: string): Observable<ArticleModel | undefined> {
        return new Observable((observer) => {
            const articles = this.articles$.getValue();
            if (articles) {
                const article = articles.find((a) => a['@id'] === id);
                observer.next(article);
                observer.complete();
            } else {
                this.loadInitialData().subscribe({
                    next: (loadedArticles) => {
                        const article = loadedArticles.find((a) => a['@id'] === id);
                        observer.next(article);
                        observer.complete();
                    },
                    error: (err) => observer.error(err)
                });
            }
        });
    }
    getArticlesByTechnologies(technologies: any[]): Observable<ArticleModel[]> {
        return this.http.get<ArticleModel[]>(this.articlesUrl).pipe(
            map(article => article.filter(article => 
                article.technologies?.some(tech => 
                    technologies.some(t => t.name === tech.name)
                )
            ))
        );
    }
    
}