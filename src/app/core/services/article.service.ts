import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ArticleModel } from '../models/article.model';
import {environment} from "../../../environments/environment";
import {ArticleAdd} from "../models/article-add.model";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    // private articlesUrl = './assets/mock/articles.json';
    private articlesUrl = `${environment.apiUrl}/articles`;
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

    /**
     * Envoie un article au backend via POST
     * @param article - Les données de l'article à ajouter
     * @returns Un Observable de la réponse
     */
    addArticle(article: ArticleAdd): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(this.articlesUrl, article, { headers });
    }
    updateArticleUrl(articleId: string, url: string): Observable<any> {
        const endpoint = `${this.articlesUrl}/${articleId}/url`;
        const payload = { url };
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        // return this.http.patch(endpoint, payload, { headers });
        return this.http.patch<{ message: string; url: string }>(endpoint, payload, { headers });

    }

    getArticles(): Observable<ArticleModel[] | null> {
        return this.articles$.asObservable();
    }

    getArticleById(id: string): Observable<ArticleModel | any> {
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

    /**
     * Upload un fichier et retourne un Observable de l'URL du fichier
     * @param file Fichier à uploader
     */
    uploadCoverImage(file: File): Observable<{ message: string; url: string }> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<{ message: string; url: string }>(`${environment.apiUrl}/upload`, formData);
    }





}

